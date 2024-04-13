import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { ImagemEvento } from "@/dominio/evento/agregados/imagem-evento.aggregate";

class ImagemEventoMapper extends ObjectMapper<ImagemEvento, string> {

    public constructor(){
        super();
    }

    public mapear(imagem: ImagemEvento): string {
        return imagem.urlImagem.valor;
    }
}

export { ImagemEventoMapper };
