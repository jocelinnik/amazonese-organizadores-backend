import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { EditarEventoDTO } from "@/aplicacao/evento/dto/evento.dto";
import { BaseModelException } from "@/dominio/abstracoes/excecoes/model.exception";
import { Evento } from "@/dominio/evento/agregados/evento.aggregate";
import { EventosRepository } from "@/dominio/evento/repositorios/eventos.repository";

type EditarEventoParams = {
    eventoMapper: ObjectMapper<EditarEventoDTO, Evento>;
    eventosRepository: EventosRepository;
};

class EditarEvento {

    private readonly _eventoMapper: ObjectMapper<EditarEventoDTO, Evento>;

    private readonly _eventosRepository: EventosRepository;

    public constructor(params: EditarEventoParams){
        this._eventoMapper = params.eventoMapper;
        this._eventosRepository = params.eventosRepository;
    }

    public async executar(input: EditarEventoDTO): Promise<void> {
        try{
            const evento = this._eventoMapper.mapear(input);
            await this._eventosRepository.salvar(evento);
        }catch(e: any){
            const erro = e as BaseModelException;

            throw new Error(erro.causa.message);
        }
    }
}

export { EditarEvento };
