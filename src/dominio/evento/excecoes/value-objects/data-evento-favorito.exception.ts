import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";

class DataEventoFavoritoVOInvalidaException extends BaseVOException {

    public constructor(mensagem: string = "Data do evento favorito inválida."){
        super(mensagem);
    }
}

export { DataEventoFavoritoVOInvalidaException };
