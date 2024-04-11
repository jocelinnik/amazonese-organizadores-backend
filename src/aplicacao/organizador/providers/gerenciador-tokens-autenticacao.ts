import { TokenAutenticacaoDTO } from "@/aplicacao/organizador/dto/token-autenticacao.dto";
import { TokenExpiradoError, TokenInvalidoError } from "@/aplicacao/comum/excecoes/token-autenticacao.exception";

/**
 * 
 * Interface que define as operações de
 * manipulação de tokens de autenticação 
 * na aplicação.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
interface GerenciadorTokenAutenticacao {

    /**
     * 
     * Método que gera um novo token de 
     * autenticação usando um conjunto 
     * de dados.
     * 
     * @param dados Dados para geração do token
     * de autenticação.
     * @returns Token de autenticação gerado.
     */
    gerarToken(dados: any): Promise<TokenAutenticacaoDTO>;

    /**
     * 
     * Método que verifica se um token de
     * autenticação é válido ou não. Caso não 
     * seja válido, deve levantar uma exceção.
     * 
     * @param token Token de autenticação para validar.
     * @throws {TokenExpiradoError} O token está
     * expirado.
     * @throws {TokenInvalidoError} O token está
     * inválido.
     */
    validarToken(token: string): Promise<void>;

    /**
     * 
     * Método que extrai os dados a partir da 
     * carga de dados do token de autenticação.
     * 
     * @param token Token de autenticação para extrair os dados.
     * @returns Dados extraídos.
     */
    extrairDados(token: string): Promise<any>;

}

export { GerenciadorTokenAutenticacao };
