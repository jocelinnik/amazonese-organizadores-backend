import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { DatasEventoDTO } from "@/aplicacao/evento/dto/evento.dto";
import { DatasEventoVO } from "@/dominio/evento/value-objects/datas-evento.vo";

class DatasEventoDTOMapper extends ObjectMapper<DatasEventoVO, DatasEventoDTO> {

    public constructor(){
        super();
    }

    public mapearOrigemParaDestino(datas: DatasEventoVO): DatasEventoDTO {
        return {
            data_inicio: this.formatarDataPadraoISO(datas.dataInicio),
            data_fim: this.formatarDataPadraoISO(datas.dataFim)
        };
    }

    private formatarDataPadraoISO(data: Date): string {
        return data.toISOString().split("T")[0];
    }
}

export { DatasEventoDTOMapper };
