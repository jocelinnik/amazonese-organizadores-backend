import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { EventoDTO } from "@/aplicacao/evento/dto/evento.dto";
import { BaseModelException } from "@/dominio/abstracoes/excecoes/model.exception";
import { Evento } from "@/dominio/evento/agregados/evento.aggregate";
import { EventosRepository } from "@/dominio/evento/repositorios/eventos.repository";
import { Organizador } from "@/dominio/organizador/modelos/organizador.model";

type BuscarEventosPorOrganizadorParams = {
    repository: EventosRepository;
    mapper: ObjectMapper<Evento, EventoDTO>;
};
type BuscarEventosPorOrganizadorInput = {
    organizador: Organizador;
};

class BuscarEventosPorOrganizador {

    private readonly _repository: EventosRepository;

    private readonly _mapper: ObjectMapper<Evento, EventoDTO>;

    public constructor(params: BuscarEventosPorOrganizadorParams){
        this._repository = params.repository;
        this._mapper = params.mapper;
    }

    public async executar(input: BuscarEventosPorOrganizadorInput): Promise<Array<EventoDTO>> {
        try{
            const { organizador } = input;
            const eventos = await this._repository.buscarEventosPorOrganizador(organizador);

            return this._mapper.mapearLista(eventos);
        }catch(e: any){
            console.error(e);
            const erro = e as BaseModelException;

            throw new Error(erro.causa.message);
        }
    }
}

export { BuscarEventosPorOrganizador };
