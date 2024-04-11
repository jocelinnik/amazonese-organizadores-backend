import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { CategoriaVO } from "@/dominio/evento/value-objects/categoria.vo";

class CategoriaVOMapper extends ObjectMapper<string, CategoriaVO> {

    public constructor(){
        super();
    }

    public mapearOrigemParaDestino(categoria: string): CategoriaVO {
        return CategoriaVO.instanciar(categoria);
    }
}

export { CategoriaVOMapper };
