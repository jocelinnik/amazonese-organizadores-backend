import { Request, Response } from "express";

import { Arquivo } from "@/aplicacao/comum/providers/manipulador-arquivos";
import { Mensagem } from "@/aplicacao/comum/dto/mensagem.dto";
import { AdicionarImagemEvento } from "@/aplicacao/evento/casos-uso/adicionar-imagem-evento.usecase";
import { ImagemEventoDTO } from "@/aplicacao/evento/dto/imagem-evento.dto";

type AdicionarImagemEventoControllerParams = {
    useCase: AdicionarImagemEvento;
};

class AdicionarImagemEventoController {

    private readonly _useCase: AdicionarImagemEvento;

    public constructor(params: AdicionarImagemEventoControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        let status = 201;
        const mensagem: Mensagem = {
            tipo: "SUCESSO",
            texto: ""
        };

        try{
            const imagemDTO: ImagemEventoDTO = {
                id_evento: req.body.id_evento as string,
                arquivo: req.body.arquivo as Arquivo
            };
            const urlImagem = await this._useCase.executar(imagemDTO);
            mensagem.texto = urlImagem;
        }catch(e: any){
            const erro = e as Error;
            status = 400;
            mensagem.tipo = "ERRO";
            mensagem.texto = erro.message;
        }

        res.status(status).json(mensagem);
    }
}

export { AdicionarImagemEventoController };
