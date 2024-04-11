import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";

class SenhaVOInvalidaException extends BaseVOException {

    public constructor(mensagem: string = "Senha inválida."){
        super(mensagem);
    }
}

export { SenhaVOInvalidaException };
