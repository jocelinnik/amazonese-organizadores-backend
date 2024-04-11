import { createHmac } from "node:crypto";

import { CargaTokenAutenticacaoDTO, TokenAutenticacaoDTO } from "@/aplicacao/organizador/dto/token-autenticacao.dto";
import { GerenciadorTokenAutenticacao } from "@/aplicacao/organizador/providers/gerenciador-tokens-autenticacao";

type CryptoJWTGerenciadorTokenAutenticacaoParams = {
    chave: string;
    sub: string;
    tempoVidaToken: number;
};

/**
 * 
 * Classe que implementa as operações de manipulação
 * de tokens de autenticação na aplicação, utilizando 
 * uma forma de implementação customizada de tokens
 * JWT.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
class CryptoJWTGerenciadorTokenAutenticacao implements GerenciadorTokenAutenticacao {

    /**
     * 
     * Cabeçalho do token JWT.
     */
    private cabecalho: {[key: string]: string};

    /**
     * 
     * Algoritmo de criptografia da assinatura 
     * do token JWT.
     */
    private algoritmo: string;

    /**
     * 
     * Chave secreta para criptografia do token
     * JWT.
     */
    private chave: string;

    /**
     * 
     * Segredo da carga de dados do token JWT.
     */
    private sub: string;

    /**
     * 
     * Tempo de expiração, em minutos, do token 
     * JWT.
     */
    private tempoVidaToken: number;

    /**
     * 
     * No construtor, recebemos a chave secreta, o segredo da 
     * carga de dados e o tempo de vida do token JWT, além de
     * definirmos o cabeçalho do token JWT e o algoritmo de 
     * criptografia da assinatura.
     * 
     * @param chave Chave secreta do token JWT.
     * @param sub Segredo da carga de dados do token JWT.
     * @param tempoVidaToken Tempo de vida, em segundos, do token
     * JWT.
     */
    public constructor(params: CryptoJWTGerenciadorTokenAutenticacaoParams){
        this.chave = params.chave;
        this.sub = params.sub;
        this.tempoVidaToken = params.tempoVidaToken;
        this.cabecalho = {
            "alg": "HS256",
            "typ": "JWT"
        };
        this.algoritmo = "sha256";
    }

    /**
     * @inheritdoc
     */
    public async gerarToken(dados: any): Promise<TokenAutenticacaoDTO> {
        // Gerando o objeto com a carga de dados do
        // token JWT...
        const carga: CargaTokenAutenticacaoDTO = {
            sub: this.sub,
            exp: Date.now() + this.tempoVidaToken * 60 * 1000,
            dados: dados
        };

        // Gerando a criptografia do cabeçalho e da 
        // carga de dados do token JWT em Base64, e
        // gerando a assinatura do token JWT...
        const cabecalhoBase64 = await this.criptografarEmBase64(JSON.stringify(this.cabecalho));
        const cargaBase64 = await this.criptografarEmBase64(JSON.stringify(carga));
        const assinatura = await this.criptografarAssinatura(cabecalhoBase64, cargaBase64);

        return {
            expiracao: carga.exp,
            access_token: `${cabecalhoBase64}.${cargaBase64}.${assinatura}`
        };
    }

    /**
     * @inheritdoc
     */
    public async validarToken(token: string): Promise<void> {
        // Quebrando o token JWT no caractere de '.', 
        // gerando 3 partes...
        const partes = token.split(".");

        const cabecalhoSerializado = partes[0];
        const cargaSerializada = partes[1];
        const assinaturaSerializada = partes[2];

        // Verificando se o tempo de expiração do token 
        // JWT é menor que o momento atual. Se não, levanta 
        // uma exceção de token expirado...
        const carga = JSON.parse(await this.decriptografarEmBase64(cargaSerializada)) as CargaTokenAutenticacaoDTO;
        const expiracao = carga.exp;

        if(Date.now() > expiracao)
            throw new Error("Token JWT expirado");

        // Gerando uma nova assinatura a partir das partes
        // coletadas do token JWT. Caso a nova assinatura 
        // gerada seja diferente da assinatura repassada 
        // pelo token JWT, levanta uma exceção de token
        // inválido...
        const assinatura = await this.criptografarAssinatura(cabecalhoSerializado, cargaSerializada);
        if(assinaturaSerializada !== assinatura)
            throw new Error("Token JWT inválido");
    }

    /**
     * @inheritdoc
     */
    public async extrairDados(token: string): Promise<any> {
        const cargaSerializada = token.split(".")[1];
        const carga = JSON.parse(await this.decriptografarEmBase64(cargaSerializada)) as CargaTokenAutenticacaoDTO;

        return carga.dados;
    }

    /**
     * 
     * Método que gera a assinatura do token JWT com
     * o cabeçalho e a carga de dados.
     * 
     * @param cabecalhoBase64 Cabeçalho do token, criptografado
     * em Base64.
     * @param cargaBase64 Carga de dados do token, criptografado
     * em Base64.
     * @returns Assinatura do token JWT gerado, criptografado em
     * Base64.
     */
    private async criptografarAssinatura(cabecalhoBase64: string, cargaBase64: string): Promise<string> {
        const cifrador = createHmac(this.algoritmo, this.chave);

        return (
            cifrador
                .update(`${cabecalhoBase64}.${cargaBase64}`)
                .digest("base64")
        );
    }

    /**
     * 
     * Método que gera a criptografia de uma carga de 
     * dados de UTF-8 para Base64.
     * 
     * @param carga Carga de dados para criptografar.
     * @returns Carga de dados criptografada.
     */
    private async criptografarEmBase64(carga: string): Promise<string> {
        return (
            Buffer
                .from(carga, "utf-8")
                .toString("base64")
        );
    }

    /**
     * 
     * Método que gera a decriptografia de uma carga
     * de dados de Base64 para UTF-8.
     * 
     * @param carga Carga de dados para decriptografar.
     * @returns Carga de dados decriptografada.
     */
    private async decriptografarEmBase64(carga: string): Promise<string> {
        return(
            Buffer
                .from(carga, "base64")
                .toString("utf-8")
        );
    }
}

export { CryptoJWTGerenciadorTokenAutenticacao };
