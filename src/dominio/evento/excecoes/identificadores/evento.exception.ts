import { BaseIdException } from "@/dominio/abstracoes/excecoes/identificador.exception";

class EventoIdInvalidoException extends BaseIdException {

    public constructor(mensagem: string = "ID do evento inválido."){
        super(mensagem);
    }
}

export { EventoIdInvalidoException };
