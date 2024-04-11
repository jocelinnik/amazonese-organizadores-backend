import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";

class PrecoVOInvalidoException extends BaseVOException {

    public constructor(mensagem: string = "Preço da entrada do evento inválido."){
        super(mensagem);
    }
}

export { PrecoVOInvalidoException };
