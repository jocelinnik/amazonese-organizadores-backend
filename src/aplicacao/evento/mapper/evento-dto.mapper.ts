import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import {
    DatasEventoDTO,
    EventoDTO,
    LocalidadeEventoDTO
} from "@/aplicacao/evento/dto/evento.dto";
import { Evento } from "@/dominio/evento/agregados/evento.aggregate";
import { ImagemEvento } from "@/dominio/evento/agregados/imagem-evento.aggregate";
import { CategoriaVO } from "@/dominio/evento/value-objects/categoria.vo";
import { DatasEventoVO } from "@/dominio/evento/value-objects/datas-evento.vo";
import { LocalidadeVO } from "@/dominio/evento/value-objects/localidade.vo";

type NewDadosEventoDTOMapperParams = {
    categoriaDTOMapper: ObjectMapper<CategoriaVO, string>;
    imagemEventoMapper: ObjectMapper<ImagemEvento, string>;
    datasEventoDTOMapper: ObjectMapper<DatasEventoVO, DatasEventoDTO>;
    localidadeDTOMapper: ObjectMapper<LocalidadeVO, LocalidadeEventoDTO>;
};

class EventoDTOMapper extends ObjectMapper<Evento, EventoDTO> {

    private readonly _categoriaDTOMapper: ObjectMapper<CategoriaVO, string>;

    private readonly _imagemEventoMapper: ObjectMapper<ImagemEvento, string>;

    private readonly _datasEventoDTOMapper: ObjectMapper<DatasEventoVO, DatasEventoDTO>;

    private readonly _localidadeDTOMapper: ObjectMapper<LocalidadeVO, LocalidadeEventoDTO>;

    public constructor(params: NewDadosEventoDTOMapperParams){
        super();

        this._categoriaDTOMapper = params.categoriaDTOMapper;
        this._imagemEventoMapper = params.imagemEventoMapper;
        this._datasEventoDTOMapper = params.datasEventoDTOMapper;
        this._localidadeDTOMapper = params.localidadeDTOMapper;
    }

    public mapearOrigemParaDestino(evento: Evento): EventoDTO {
        return {
            id: evento.id.valor,
            nome: evento.nome.valor,
            descricao: evento.descricao.valor,
            preco: evento.preco.valor,
            categorias: this._categoriaDTOMapper.mapearListaOrigemParaListaDestino(evento.categorias),
            imagens: this._imagemEventoMapper.mapearListaOrigemParaListaDestino(evento.imagens),
            localidade: this._localidadeDTOMapper.mapearOrigemParaDestino(evento.localidade),
            datas_evento: this._datasEventoDTOMapper.mapearOrigemParaDestino(evento.datasEvento)
        };
    }
}

export { EventoDTOMapper };
