import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";

class FraseSecretaVOInvalidaException extends BaseVOException {

    public constructor(mensagem: string = "Frase secreta inválida."){
        super(mensagem);
    }
}

export { FraseSecretaVOInvalidaException };
