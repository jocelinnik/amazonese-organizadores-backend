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
        try{
            const dadosNovoEvento = req.body as NovoEventoDTO;
            const novoEvento = await this._useCase.executar(dadosNovoEvento);

            res.status(201).json(novoEvento);
        }catch(e: any){
            const erro = e as Error;
            const mensagem: Mensagem = {
                tipo: "ERRO",
                texto: `Falha ao tentar criar um novo evento: ${erro.message}`
            };

            res.status(400).json(mensagem);
        }
    }
}

export { CadastrarNovoEventoController };
