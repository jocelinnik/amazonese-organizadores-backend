import { Request, Response } from "express";

import { Mensagem } from "@/aplicacao/comum/dto/mensagem.dto";
import { EditarEvento } from "@/aplicacao/evento/casos-uso/editar-evento.usecase";
import { EditarEventoDTO } from "@/aplicacao/evento/dto/evento.dto";

type EditarEventoControllerParams = {
    useCase: EditarEvento;
};

class EditarEventoController {

    private readonly _useCase: EditarEvento;

    public constructor(params: EditarEventoControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        const mensagem: Mensagem = {
            tipo: "SUCESSO",
            texto: "Evento editado com sucesso"
        };

        try{
            const dadosEvento = req.body as EditarEventoDTO;
            console.log({ ...dadosEvento });
            await this._useCase.executar(dadosEvento);
        }catch(e: any){
            const erro = e as Error;

            mensagem.tipo = "ERRO";
            mensagem.texto = `Falha ao tentar editar os dados do evento: ${erro.message}`;
        }

        const status = (mensagem.tipo === "SUCESSO") ? 200 : 400;

        res.status(status).json(mensagem);
    }
}

export { EditarEventoController };
