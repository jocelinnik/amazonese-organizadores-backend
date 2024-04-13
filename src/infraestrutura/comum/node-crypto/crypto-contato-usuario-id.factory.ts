import { randomUUID } from "node:crypto";

import { IdentificadorFactory } from "@/dominio/abstracoes/identificadores/identificador.factory";
import { ContatoUsuarioId } from "@/dominio/comum/identificadores/contato-usuario.identificador";

class CryptoContatoUsuarioIdFactory implements IdentificadorFactory<ContatoUsuarioId> {

    public async gerarNovoId(): Promise<ContatoUsuarioId> {
        return ContatoUsuarioId.instanciar(randomUUID());
    }
}

export { CryptoContatoUsuarioIdFactory };
