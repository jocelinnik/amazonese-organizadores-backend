import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { EventoDTO } from "@/aplicacao/evento/dto/evento.dto";
import { BaseModelException } from "@/dominio/abstracoes/excecoes/model.exception";
import { Evento } from "@/dominio/evento/agregados/evento.aggregate";
import { EventosRepository } from "@/dominio/evento/repositorios/eventos.repository";
import { CpfCnpjOrganizador } from "@/dominio/organizador/identificadores/organizador.identificador";
import { OrganizadoresRepository } from "@/dominio/organizador/repositorios/organizadores.repository";

type BuscarEventosPorOrganizadorParams = {
    eventosRepository: EventosRepository;
    organizadoresRepository: OrganizadoresRepository;
    eventoDTOMapper: ObjectMapper<Evento, EventoDTO>;
};

class BuscarEventosPorOrganizador {

    private readonly _eventosRepository: EventosRepository;

    private readonly _organizadoresRepository: OrganizadoresRepository;

    private readonly _eventoDTOMapper: ObjectMapper<Evento, EventoDTO>;

    public constructor(params: BuscarEventosPorOrganizadorParams){
        this._eventosRepository = params.eventosRepository;
        this._organizadoresRepository = params.organizadoresRepository;
        this._eventoDTOMapper = params.eventoDTOMapper;
    }

    public async executar(input: string): Promise<Array<EventoDTO>> {
        try{
            const cpfOuCnpjOrganizador = CpfCnpjOrganizador.instanciar(input);
            const organizador = await this._organizadoresRepository.buscarPorCpfCnpj(cpfOuCnpjOrganizador);
            const eventos = await this._eventosRepository.buscarEventosPorOrganizador(organizador);

            return this._eventoDTOMapper.mapearLista(eventos);
        }catch(e: any){
            console.error(e);
            const erro = e as BaseModelException;

            throw new Error(erro.causa.message);
        }
    }
}

export { BuscarEventosPorOrganizador };
