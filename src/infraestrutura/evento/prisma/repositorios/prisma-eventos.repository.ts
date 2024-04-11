import { PrismaClient } from "@prisma/client";

import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { Evento } from "@/dominio/evento/agregados/evento.aggregate";
import { EventoNaoEncontradoException } from "@/dominio/evento/excecoes/repositorios/eventos-repository.exception";
import { EventoId } from "@/dominio/evento/identificadores/evento.identificador";
import { EventosRepository } from "@/dominio/evento/repositorios/eventos.repository";
import { Organizador } from "@/dominio/organizador/modelos/organizador.model";
import { PrismaEventoEntity } from "@/infraestrutura/evento/prisma/entidades/prisma-evento.entity";

type NewPrismaEventosRepositoryParams = {
    conexao: PrismaClient;
    eventoMapper: ObjectMapper<PrismaEventoEntity, Evento>;
};

class PrismaEventosRepository implements EventosRepository {

    private readonly _conexao: PrismaClient;

    private readonly _eventoMapper: ObjectMapper<PrismaEventoEntity, Evento>;

    public constructor(params: NewPrismaEventosRepositoryParams){
        this._conexao = params.conexao;
        this._eventoMapper = params.eventoMapper;
    }

    public async buscarEventoPorId(id: EventoId): Promise<Evento> {
        const dadosEvento = await this._conexao.evento.findFirst({
            where: {
                id: id.valor
            },
            include: {
                organizador: true,
                imagens: true
            }
        });

        if(!dadosEvento)
            throw new EventoNaoEncontradoException(`O evento com ID ${id.valor} não foi encontrado`);

        return this._eventoMapper.mapearOrigemParaDestino(dadosEvento);
    }

    public async buscarEventosPorOrganizador(organizador: Organizador): Promise<Array<Evento>> {
        const dadosEventos = await this._conexao.evento.findMany({
            where: {
                cpfCnpjOrganizador: organizador.cpfOuCnpj.valor
            },
            include: {
                organizador: true,
                imagens: true
            }
        });

        return this._eventoMapper.mapearListaOrigemParaListaDestino(dadosEventos);
    }

    public async salvar(evento: Evento): Promise<void> {
        await this._conexao.evento.upsert({
            create: {
                id: evento.id.valor,
                nome: evento.nome.valor,
                descricao: evento.descricao.valor,
                preco: evento.preco.valor,
                cidadeEvento: evento.localidade.cidade,
                ufEvento: evento.localidade.uf,
                dataInicio: evento.datasEvento.dataInicio,
                dataFim: evento.datasEvento.dataFim,
                cpfCnpjOrganizador: evento.organizador.cpfOuCnpj.valor,
                categorias: [...evento.categorias.map(cat => cat.valor)]
            },
            update: {
                nome: evento.nome.valor,
                descricao: evento.descricao.valor,
                preco: evento.preco.valor,
                cidadeEvento: evento.localidade.cidade,
                ufEvento: evento.localidade.uf,
                dataInicio: evento.datasEvento.dataInicio,
                dataFim: evento.datasEvento.dataFim,
                categorias: [...evento.categorias.map(cat => cat.valor)]
            },
            where: {
                id: evento.id.valor
            }
        });
    }
}

export { PrismaEventosRepository };
