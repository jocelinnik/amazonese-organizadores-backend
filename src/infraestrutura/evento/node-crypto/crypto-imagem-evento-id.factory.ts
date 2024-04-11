import { randomUUID } from "node:crypto";

import { IdentificadorFactory } from "@/dominio/abstracoes/identificadores/identificador.factory";
import { ImagemEventoId } from "@/dominio/evento/identificadores/imagem-evento.identificador";

class CryptoImagemEventoIdFactory implements IdentificadorFactory<ImagemEventoId> {

    public async gerarNovoId(): Promise<ImagemEventoId> {
        return ImagemEventoId.instanciar(randomUUID());
    }
}

export { CryptoImagemEventoIdFactory };
