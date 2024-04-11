import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";

class UrlImagemVOInvalidoException extends BaseVOException {

    public constructor(mensagem: string = "URL da imagem inválida."){
        super(mensagem);
    }
}

export { UrlImagemVOInvalidoException };
