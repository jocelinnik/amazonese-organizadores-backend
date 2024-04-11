import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";

class DatasEventoVOInvalidaException extends BaseVOException {

    public constructor(mensagem: string){
        super(mensagem);
    }
}

export { DatasEventoVOInvalidaException };
