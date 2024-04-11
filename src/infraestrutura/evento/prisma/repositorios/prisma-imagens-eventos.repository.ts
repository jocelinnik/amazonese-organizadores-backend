import { PrismaClient } from "@prisma/client";

import { ImagemEvento } from "@/dominio/evento/agregados/imagem-evento.aggregate";
import { ImagensEventosRepository } from "@/dominio/evento/repositorios/imagens-eventos.repository";

type PrismaImagensEventosRepositoryParams = {
    conexao: PrismaClient;
};

class PrismaImagensEventosRepository implements ImagensEventosRepository {

    private readonly _conexao: PrismaClient;

    public constructor(params: PrismaImagensEventosRepositoryParams){
        this._conexao = params.conexao;
    }

    public async salvarImagemEvento(imagemEvento: ImagemEvento): Promise<void> {
        await this._conexao.imagemEvento.create({
            data: {
                id: imagemEvento.id.valor,
                urlImagem: imagemEvento.urlImagem.valor,
                idEvento: imagemEvento.evento.id.valor
            }
        });
    }
}

export { PrismaImagensEventosRepository };
