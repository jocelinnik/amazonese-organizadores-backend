import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";

class LocalidadeVOInvalidaException extends BaseVOException {

    public constructor(mensagem: string = "Localidade do evento inválida."){
        super(mensagem);
    }
}

export { LocalidadeVOInvalidaException };
