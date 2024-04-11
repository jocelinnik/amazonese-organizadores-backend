import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { DadosEventoDTO } from "@/aplicacao/evento/dto/evento.dto";
import { Evento } from "@/dominio/evento/agregados/evento.aggregate";
import { EventoId } from "@/dominio/evento/identificadores/evento.identificador";
import { EventosRepository } from "@/dominio/evento/repositorios/eventos.repository";

type BuscarEventoPorIdParams = {
    repository: EventosRepository;
    eventoDTOMapper: ObjectMapper<Evento, DadosEventoDTO>;
};

class BuscarEventoPorId {

    private readonly _repository: EventosRepository;

    private readonly _eventoDTOMapper: ObjectMapper<Evento, DadosEventoDTO>;

    public constructor(params: BuscarEventoPorIdParams){
        this._repository = params.repository;
        this._eventoDTOMapper = params.eventoDTOMapper;
    }

    public async executar(input: string): Promise<DadosEventoDTO> {
        const idEvento = EventoId.instanciar(input);
        const evento = await this._repository.buscarEventoPorId(idEvento);

        return this._eventoDTOMapper.mapearOrigemParaDestino(evento);
    }
}

export { BuscarEventoPorId };
