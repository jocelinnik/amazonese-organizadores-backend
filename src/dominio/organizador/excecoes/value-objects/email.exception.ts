import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";

class EmailVOInvalidoException extends BaseVOException {

    public constructor(mensagem: string = "E-mail inválido."){
        super(mensagem);
    }
}

export { EmailVOInvalidoException };
