import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";

class NomeVOInvalidoException extends BaseVOException {

    public constructor(mensagem: string = "Nome inválido."){
        super(mensagem);
    }
}

export { NomeVOInvalidoException };
