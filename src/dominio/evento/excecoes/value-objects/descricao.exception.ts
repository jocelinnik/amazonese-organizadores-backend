import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";

class DescricaoVOInvalidaException extends BaseVOException {

    public constructor(mensagem: string = "Descrição do evento inválida."){
        super(mensagem);
    }
}

export { DescricaoVOInvalidaException };
