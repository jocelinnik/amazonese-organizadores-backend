import { Evento } from "@/dominio/evento/agregados/evento.aggregate";
import { EventoId } from "@/dominio/evento/identificadores/evento.identificador";
import { Organizador } from "@/dominio/organizador/modelos/organizador.model";

interface EventosRepository {

    buscarEventoPorId(id: EventoId): Promise<Evento>;

    buscarEventosPorOrganizador(organizador: Organizador): Promise<Array<Evento>>;

    salvar(evento: Evento): Promise<void>;

}

export { EventosRepository };
