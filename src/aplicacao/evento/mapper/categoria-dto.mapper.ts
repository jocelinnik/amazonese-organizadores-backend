import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { CategoriaVO } from "@/dominio/evento/value-objects/categoria.vo";

class CategoriaDTOMapper extends ObjectMapper<CategoriaVO, string> {

    public constructor(){
        super();
    }

    public mapear(categoria: CategoriaVO): string {
        return categoria.valor;
    }
}

export { CategoriaDTOMapper };
