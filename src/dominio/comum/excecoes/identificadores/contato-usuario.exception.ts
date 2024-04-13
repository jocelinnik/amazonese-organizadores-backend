import { BaseIdException } from "@/dominio/abstracoes/excecoes/identificador.exception";

class ContatoUsuarioIdInvalidoException extends BaseIdException {

    public constructor(mensagem: string = "ID do contato inválido."){
        super(mensagem);
    }
}

export { ContatoUsuarioIdInvalidoException };
