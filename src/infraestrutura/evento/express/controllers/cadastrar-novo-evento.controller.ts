import { Request, Response } from "express";

import { Mensagem } from "@/aplicacao/comum/dto/mensagem.dto";
import { CadastrarNovoEvento } from "@/aplicacao/evento/casos-uso/cadastrar-novo-evento.usecase";
import { NovoEventoDTO } from "@/aplicacao/evento/dto/evento.dto";

type CadastrarNovoEventoControllerParams = {
    useCase: CadastrarNovoEvento;
};

class CadastrarNovoEventoController {

    private _useCase: CadastrarNovoEvento;

    public constructor(params: CadastrarNovoEventoControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        const mensagem: Mensagem = {
            tipo: "SUCESSO",
            texto: "Evento criado com sucesso"
        };

        try{
            const dadosNovoEvento = req.body as NovoEventoDTO;
            console.log({ ...dadosNovoEvento });
            await this._useCase.executar(dadosNovoEvento);
        }catch(e: any){
            const erro = e as Error;

            mensagem.tipo = "ERRO";
            mensagem.texto = `Falha ao tentar criar um novo evento: ${erro.message}`;
        }

        const status = (mensagem.tipo === "SUCESSO") ? 201 : 400;

        res.status(status).json(mensagem);
    }
}

export { CadastrarNovoEventoController };
