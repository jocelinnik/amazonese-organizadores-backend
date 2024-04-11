import { NextFunction, Request, Response } from "express";

import { Arquivo } from "@/aplicacao/comum/providers/manipulador-arquivos";

class FormatadorArquivos {

    public async executar(req: Request, _: Response, next: NextFunction): Promise<void> {
        const arquivo = req.file as Express.Multer.File;
        const arquivoMapeado: Arquivo = {
            nome: arquivo.originalname,
            tipo: arquivo.mimetype,
            conteudo: arquivo.buffer,
            tamanho: arquivo.size,
            extensao: `${arquivo.originalname.split(".").pop()}`
        };

        Object.assign(req.body, { arquivo: arquivoMapeado });
        next();
    }
}

export { FormatadorArquivos };
