import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { DatasEventoDTO } from "@/aplicacao/evento/dto/evento.dto";
import { DatasEventoVO } from "@/dominio/evento/value-objects/datas-evento.vo";

class DatasEventoDTOMapper extends ObjectMapper<DatasEventoVO, DatasEventoDTO> {

    public constructor(){
        super();
    }

    public mapear(datas: DatasEventoVO): DatasEventoDTO {
        return {
            data_inicio: datas.dataInicio,
            data_fim: datas.dataFim,
            hora_inicio: datas.horaInicio,
            hora_encerramento: datas.horaEncerramento
        };
    }
}

export { DatasEventoDTOMapper };
