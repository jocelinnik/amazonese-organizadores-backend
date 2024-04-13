import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { ImagemEvento } from "@/dominio/evento/agregados/imagem-evento.aggregate";
import { ImagemEventoId } from "@/dominio/evento/identificadores/imagem-evento.identificador";
import { PrismaImagemEventoEntity } from "@/infraestrutura/evento/prisma/entidades/prisma-imagem-evento.entity";

class HidratarImagemEventoMapper extends ObjectMapper<PrismaImagemEventoEntity, ImagemEvento> {

    public constructor(){
        super();
    }

    public mapear(prismaImagemEvento: PrismaImagemEventoEntity): ImagemEvento {
        return ImagemEvento.instanciar({
            id: ImagemEventoId.instanciar(prismaImagemEvento.id),
            urlImagem: prismaImagemEvento.urlImagem
        });
    }
}

export { HidratarImagemEventoMapper };
