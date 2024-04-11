import { Request, Response } from "express";

import { Mensagem } from "@/aplicacao/comum/dto/mensagem.dto";
import { BuscarEventoPorId } from "@/aplicacao/evento/casos-uso/buscar-evento-por-id.usecase"
import { EventoException } from "@/dominio/evento/excecoes/modelos/evento.exception";
import { EventoNaoEncontradoException } from "@/dominio/evento/excecoes/repositorios/eventos-repository.exception";

type BuscarEventoPorIdControllerParams = {
    useCase: BuscarEventoPorId;
};

class BuscarEventoPorIdController {

    private readonly _useCase: BuscarEventoPorId;

    public constructor(params: BuscarEventoPorIdControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        try{
            const idEvento = req.params["id_evento"] as string;
            const evento = await this._useCase.executar(idEvento);

            res.status(200).json(evento);
        }catch(e: any){
            let status = 500;
            const mensagem: Mensagem = {
                tipo: "ERRO",
                texto: "Erro interno. Tente novamente mais tarde."
            };

            if(e instanceof EventoException){
                const erro = e as EventoException;
                status = 400;
                mensagem.texto = `${erro.message}: ${erro.causa.message}`;
            }else if(e instanceof EventoNaoEncontradoException){
                const erro = e as EventoNaoEncontradoException;
                status = 404;
                mensagem.texto = erro.message;
            }else{
                const erro = e as Error;
                mensagem.texto = `Erro interno: ${erro.message}`;
            }

            res.status(status).json(mensagem);
        }
    }
}

export { BuscarEventoPorIdController };
