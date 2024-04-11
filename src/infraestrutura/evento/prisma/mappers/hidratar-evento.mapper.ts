import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { Evento } from "@/dominio/evento/agregados/evento.aggregate";
import { ImagemEvento } from "@/dominio/evento/agregados/imagem-evento.aggregate";
import { EventoId } from "@/dominio/evento/identificadores/evento.identificador";
import { CategoriaVO } from "@/dominio/evento/value-objects/categoria.vo";
import { Organizador } from "@/dominio/organizador/modelos/organizador.model";
import { PrismaEventoEntity } from "@/infraestrutura/evento/prisma/entidades/prisma-evento.entity";
import { PrismaImagemEventoEntity } from "@/infraestrutura/evento/prisma/entidades/prisma-imagem-evento.entity";
import { PrismaOrganizadorEntity } from "@/infraestrutura/organizador/prisma/entidades/prisma-organizador.entity";

type NewHidratarEventoMapperParams = {
    categoriaVOMapper: ObjectMapper<string, CategoriaVO>;
    organizadorMapper: ObjectMapper<PrismaOrganizadorEntity, Organizador>;
    imagemEventoMapper: ObjectMapper<PrismaImagemEventoEntity, ImagemEvento>;
};

class HidratarEventoMapper extends ObjectMapper<PrismaEventoEntity, Evento> {

    private readonly _categoriaVOMapper: ObjectMapper<string, CategoriaVO>;

    private readonly _organizadorMapper: ObjectMapper<PrismaOrganizadorEntity, Organizador>;

    private readonly _imagemEventoMapper: ObjectMapper<PrismaImagemEventoEntity, ImagemEvento>;

    public constructor(params: NewHidratarEventoMapperParams){
        super();

        this._categoriaVOMapper = params.categoriaVOMapper;
        this._organizadorMapper = params.organizadorMapper;
        this._imagemEventoMapper = params.imagemEventoMapper;
    }

    public mapearOrigemParaDestino(prismaEvento: PrismaEventoEntity): Evento {
        const evento = Evento.instanciar({
            id: EventoId.instanciar(prismaEvento.id),
            nome: prismaEvento.nome,
            descricao: prismaEvento.descricao,
            preco: prismaEvento.preco.toNumber(),
            datasEvento: {
                dataInicio: this.formatarDataPadraoISO(prismaEvento.dataInicio),
                dataFim: this.formatarDataPadraoISO(prismaEvento.dataFim),
            },
            localidade: {
                cidade: prismaEvento.cidadeEvento,
                uf: prismaEvento.ufEvento
            }
        });

        // Se tivermos categorias vindas do banco de dados, adicionamos 
        // no objeto de modelo...
        if(prismaEvento.categorias){
            const categorias = this._categoriaVOMapper.mapearListaOrigemParaListaDestino(prismaEvento.categorias as string[]);

            for(let categoria of categorias){
                evento.adicionarCategoria(categoria);
            }
        }

        // Se tivermos imagens vindas do banco de dados, adicionamos
        // no objeto de modelo...
        if(prismaEvento.imagens){
            const imagensEvento = this._imagemEventoMapper.mapearListaOrigemParaListaDestino(prismaEvento.imagens as PrismaImagemEventoEntity[]);

            for(let imagemEvento of imagensEvento){
                imagemEvento.adicionarEvento(evento);
                evento.adicionarImagem(imagemEvento);
            }
        }

        // Se tivermos dados do organizador vindas do banco de dados,
        // adicionamos no objeto de modelo...
        if(prismaEvento.organizador){
            const organizador = this._organizadorMapper.mapearOrigemParaDestino(prismaEvento.organizador as PrismaOrganizadorEntity);
            evento.adicionarOrganizador(organizador);
        }

        return evento;
    }

    private formatarDataPadraoISO(data: Date): string {
        return data.toISOString().split("T")[0];
    }
}

export { HidratarEventoMapper };
