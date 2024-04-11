import { Request, Response } from "express";

import { Mensagem } from "@/aplicacao/comum/dto/mensagem.dto";
import { CadastrarNovoOrganizador } from "@/aplicacao/organizador/casos-uso/cadastrar-novo-organizador.usecase";
import { NovoOrganizadorDTO } from "@/aplicacao/organizador/dto/organizador.dto";

type CadastrarNovoOrganizadorControllerParams = {
    useCase: CadastrarNovoOrganizador;
};

class CadastrarNovoOrganizadorController {

    private _useCase: CadastrarNovoOrganizador;

    public constructor(params: CadastrarNovoOrganizadorControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        const mensagem: Mensagem = {
            tipo: "SUCESSO",
            texto: "Organizador de eventos cadastrado com sucesso"
        };

        try{
            const dadosNovoOrganizador = req.body as NovoOrganizadorDTO;
            await this._useCase.executar(dadosNovoOrganizador);
        }catch(e: any){
            const erro = e as Error;

            mensagem.tipo = "ERRO";
            mensagem.texto = `Falha ao tentar cadastrar um novo organizador de eventos: ${erro.message}`;
        }

        const status = (mensagem.tipo === "SUCESSO") ? 201 : 400;

        res.status(status).json(mensagem);
    }
}

export { CadastrarNovoOrganizadorController };
