import { NextFunction, Request, Response } from "express";

import { Mensagem } from "@/aplicacao/comum/dto/mensagem.dto";
import { GerenciadorTokenAutenticacao } from "@/aplicacao/organizador/providers/gerenciador-tokens-autenticacao";
import { CpfCnpjOrganizador } from "@/dominio/organizador/identificadores/organizador.identificador";
import { Organizador } from "@/dominio/organizador/modelos/organizador.model";
import { OrganizadoresRepository } from "@/dominio/organizador/repositorios/organizadores.repository";

type VerificadorTokenJWTParams = {
    gerenciadorTokens: GerenciadorTokenAutenticacao;
    organizadoresRepository: OrganizadoresRepository;
};

class VerificadorTokenJWT {

    private readonly _gerenciadorTokens: GerenciadorTokenAutenticacao;

    private readonly _organizadoresRepository: OrganizadoresRepository;

    public constructor(params: VerificadorTokenJWTParams){
        this._gerenciadorTokens = params.gerenciadorTokens;
        this._organizadoresRepository = params.organizadoresRepository;
    }

    public async executar(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log("Iniciando a verificacao de token JWT...");

        try{
            const bearer = req.headers.authorization as string;
            const carga = await this.validarToken(bearer);
            const organizador = await this.consultarDadosOrganizador(carga);

            Object.assign(req, { organizador });
            next();
        }catch(e: any){
            console.error(e);

            const erro = e as Error;
            const mensagem: Mensagem = {
                tipo: "ERRO",
                texto: erro.message
            };

            res.status(401).json(mensagem);
        }
    }

    private async validarToken(bearer?: string): Promise<object> {
        if(!bearer)
            throw new Error("Token JWT ausente");

        const token = bearer.split(" ")[1];
        await this._gerenciadorTokens.validarToken(token);

        return await this._gerenciadorTokens.extrairDados(token) as object;
    }

    private async consultarDadosOrganizador(carga: object): Promise<Organizador> {
        const cpfCnpjOrganizador = CpfCnpjOrganizador.instanciar(carga["cpf_cnpj"] as string);

        return await this._organizadoresRepository.buscarPorCpfCnpj(cpfCnpjOrganizador);
    }
}

export { VerificadorTokenJWT };
