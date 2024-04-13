import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { LocalidadeEventoDTO } from "@/aplicacao/evento/dto/evento.dto";
import { LocalidadeVO } from "@/dominio/evento/value-objects/localidade.vo";

class LocalidadeEventoDTOMapper extends ObjectMapper<LocalidadeVO, LocalidadeEventoDTO> {

    public constructor(){
        super();
    }

    public mapear(localidade: LocalidadeVO): LocalidadeEventoDTO {
        return {
            cidade: localidade.cidade,
            uf: localidade.uf
        };
    }
}

export { LocalidadeEventoDTOMapper };
