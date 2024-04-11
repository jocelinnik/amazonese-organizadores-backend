import { Request, Response } from "express";

import { Mensagem } from "@/aplicacao/comum/dto/mensagem.dto";
import { RedefinirSenhaOrganizador } from "@/aplicacao/organizador/casos-uso/redefinir-senha-organizador.usecase";
import { RedefinirSenhaOrganizadorDTO } from "@/aplicacao/organizador/dto/organizador.dto";

type RedefinirSenhaOrganizadorControllerParams = {
    useCase: RedefinirSenhaOrganizador;
};

class RedefinirSenhaOrganizadorController {

    private _useCase: RedefinirSenhaOrganizador;

    public constructor(params: RedefinirSenhaOrganizadorControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        const mensagem: Mensagem = {
            tipo: "SUCESSO",
            texto: "Senha redefinida com sucesso"
        };

        try{
            const dadosRedefinirSenha = req.body as RedefinirSenhaOrganizadorDTO;
            await this._useCase.executar(dadosRedefinirSenha);
        }catch(e: any){
            const erro = e as Error;

            mensagem.tipo = "ERRO";
            mensagem.texto = erro.message;
        }

        const status = (mensagem.tipo === "SUCESSO") ? 200 : 400;

        res.status(status).json(mensagem);
    }
}

export { RedefinirSenhaOrganizadorController };
