import { randomUUID } from "node:crypto";

import { IdentificadorFactory } from "@/dominio/abstracoes/identificadores/identificador.factory";
import { EventoId } from "@/dominio/evento/identificadores/evento.identificador";

class CryptoUUIDEventoIdFactory implements IdentificadorFactory<EventoId> {

    public async gerarNovoId(): Promise<EventoId> {
        return EventoId.instanciar(randomUUID());
    }
}

export { CryptoUUIDEventoIdFactory };
