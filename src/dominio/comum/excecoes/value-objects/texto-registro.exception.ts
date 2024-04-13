import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";

class TextoRegistroVOInvalidoException extends BaseVOException {

    public constructor(mensagem: string = "Texto inválido."){
        super(mensagem);
    }
}

export { TextoRegistroVOInvalidoException };
