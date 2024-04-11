import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";

class TelefoneVOInvalidoException extends BaseVOException {

    public constructor(mensagem: string = "Telefone inválido."){
        super(mensagem);
    }
}

export { TelefoneVOInvalidoException };
