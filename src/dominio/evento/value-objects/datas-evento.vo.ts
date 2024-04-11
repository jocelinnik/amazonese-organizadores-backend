import { BaseVO } from "@/dominio/abstracoes/value-objects/base.vo";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";
import { DatasEventoVOInvalidaException } from "@/dominio/evento/excecoes/value-objects/datas-evento.exception";

type NewDatasVOParams = {
    dataInicio: Date;
    dataFim: Date;
};
type InstanciarDatasVOParams = {
    dataInicio?: string;
    dataFim?: string;
};

class DatasEventoVO implements BaseVO {

    private _dataInicio: Date;
    private _dataFim: Date;

    private static readonly REGEX_DATA: RegExp = /((19|20)\d\d)-(0?[1-9]|1[012])-(0?[1-9]|[12]\d|3[01])/;

    private constructor(params: NewDatasVOParams){
        this._dataInicio = params.dataInicio;
        this._dataFim = params.dataFim;
    }

    public get dataInicio(): Date {
        return this._dataInicio;
    }

    public get dataFim(): Date {
        return this._dataFim;
    }

    public equals(o: BaseVO): boolean {
        let igual = false;

        if(o instanceof DatasEventoVO){
            const outro = o as DatasEventoVO;
            igual = (
                (this._dataInicio === outro._dataInicio) && 
                (this._dataFim === outro._dataFim)
            );
        }

        return igual;
    }

    public toString(): string {
        return `DatasEventoVO(dataInicio=${this._dataInicio.toDateString()}, dataFim=${this._dataFim.toDateString()})`;
    }

    public static instanciar(params: InstanciarDatasVOParams): DatasEventoVO {
        const dataInicio = this.instanciarDataInicio(params.dataInicio);
        const dataFim = this.instanciarDataFim(params.dataFim);

        if(dataInicio > dataFim)
            throw new DatasEventoVOInvalidaException("A data de início do evento é maior que a data de encerramento do evento.");

        return new DatasEventoVO({ dataInicio, dataFim });
    }

    private static instanciarDataInicio(dataInicio?: string): Date {
        try{
            ValidadorString
                .instanciar(dataInicio, "A data de início do evento está em branco.")
                .preenchida("A data de início do evento está em branco.")
                .compativelComRegex(this.REGEX_DATA, "A data de início do evento está com o formato inválido.");

            return new Date(dataInicio);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new DatasEventoVOInvalidaException(erro.message);
        }
    }

    private static instanciarDataFim(dataFim?: string): Date {
        try{
            ValidadorString
                .instanciar(dataFim, "A data de encerramento do evento está em branco.")
                .preenchida("A data de encerramento do evento está em branco.")
                .compativelComRegex(this.REGEX_DATA, "A data de encerramento do evento está com o formato inválido.");

            return new Date(dataFim);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new DatasEventoVOInvalidaException(erro.message);
        }
    }
}

export { DatasEventoVO, InstanciarDatasVOParams };
