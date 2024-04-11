import { BaseIdException } from "@/dominio/abstracoes/excecoes/identificador.exception";

class ImagemEventoIdInvalidoException extends BaseIdException {

    public constructor(mensagem: string = "ID da imagem do evento inválido."){
        super(mensagem);
    }
}

export { ImagemEventoIdInvalidoException };
