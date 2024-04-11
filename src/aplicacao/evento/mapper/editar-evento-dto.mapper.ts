import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { EditarEventoDTO } from "@/aplicacao/evento/dto/evento.dto";
import { Evento } from "@/dominio/evento/agregados/evento.aggregate";
import { EventoId } from "@/dominio/evento/identificadores/evento.identificador";
import { CategoriaVO } from "@/dominio/evento/value-objects/categoria.vo";

type EventoAggregateMapperParams = {
    categoriaEventoMapper: ObjectMapper<string, CategoriaVO>;
};

class EditarEventoMapper extends ObjectMapper<EditarEventoDTO, Evento> {

    private readonly _categoriaEventoMapper: ObjectMapper<string, CategoriaVO>;

    public constructor(params: EventoAggregateMapperParams){
        super();

        this._categoriaEventoMapper = params.categoriaEventoMapper;
    }

    public mapearOrigemParaDestino(dto: EditarEventoDTO): Evento {
        const evento = Evento.instanciar({
            id: EventoId.instanciar(dto.id),
            nome: dto.nome,
            descricao: dto.descricao,
            preco: dto.preco,
            localidade: {
                cidade: dto.localidade.cidade,
                uf: dto.localidade.uf
            },
            datasEvento: {
                dataInicio: dto.datas_evento.data_inicio,
                dataFim: dto.datas_evento.data_fim
            }
        });

        const categorias = this._categoriaEventoMapper.mapearListaOrigemParaListaDestino(dto.categorias);
        for(let categoria of categorias)
            evento.adicionarCategoria(categoria);

        return evento;
    }
}

export { EditarEventoMapper };
