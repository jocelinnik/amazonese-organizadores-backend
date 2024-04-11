import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { DadosEventoDTO, EventoDTO, EventosDTO } from "@/aplicacao/evento/dto/evento.dto";
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

    public async executar(input: string): Promise<EventosDTO> {
        try{
            const cpfOuCnpjOrganizador = CpfCnpjOrganizador.instanciar(input);
            const organizador = await this._organizadoresRepository.buscarPorCpfCnpj(cpfOuCnpjOrganizador);
            const eventos = await this._eventosRepository.buscarEventosPorOrganizador(organizador);
            const hoje = new Date();

            const eventosJaFinalizados = (
                eventos
                    .filter(evento => (
                        (evento.datasEvento.dataFim.getTime() - hoje.getTime()) < 0
                    ))
                    .sort((a, b) => (
                        b.datasEvento.dataFim.getTime() - a.datasEvento.dataFim.getTime()
                    ))
            );
            const eventosParaIniciar = (
                eventos
                    .filter(evento => (
                        (evento.datasEvento.dataInicio.getTime() - hoje.getTime()) >= 0
                    ))
                    .sort((a, b) => (
                        b.datasEvento.dataInicio.getTime() - a.datasEvento.dataInicio.getTime()
                    ))
            );
    
            return {
                eventos_ja_finalizados: this._eventoDTOMapper.mapearListaOrigemParaListaDestino(eventosJaFinalizados),
                eventos_para_iniciar: this._eventoDTOMapper.mapearListaOrigemParaListaDestino(eventosParaIniciar)
            };
        }catch(e: any){
            const erro = e as BaseModelException;

            throw new Error(erro.causa.message);
        }
    }
}

export { BuscarEventosPorOrganizador };
