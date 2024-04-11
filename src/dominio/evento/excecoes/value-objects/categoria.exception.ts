import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";

class CategoriaVOInvalidaException extends BaseVOException {

    public constructor(mensagem: string = "Categoria de evento inválida."){
        super(mensagem);
    }
}

export { CategoriaVOInvalidaException };
