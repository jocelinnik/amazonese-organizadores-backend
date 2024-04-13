import { BaseVO } from "@/dominio/abstracoes/value-objects/base.vo";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";
import { DatasEventoVOInvalidaException } from "@/dominio/evento/excecoes/value-objects/datas-evento.exception";

type NewDatasVOParams = {
    dataInicio: string;
    dataFim: string;
    horaInicio: string;
    horaEncerramento: string;
};
type InstanciarDatasVOParams = {
    dataInicio?: string;
    dataFim?: string;
    horaInicio?: string;
    horaEncerramento?: string;
};

class DatasEventoVO implements BaseVO {

    private readonly _dataInicio: string;
    private readonly _dataFim: string;
    private readonly _horaInicio: string;
    private readonly _horaEncerramento: string;

    private static readonly REGEX_DATA: RegExp = /((19|20)\d\d)-(0?[1-9]|1[012])-(0?[1-9]|[12]\d|3[01])/;
    private static readonly REGEX_HORA: RegExp = /([01]?\d|2[0-3]):[0-5]\d:[0-5]\d/;

    private constructor(params: NewDatasVOParams){
        this._dataInicio = params.dataInicio;
        this._dataFim = params.dataFim;
        this._horaInicio = params.horaInicio;
        this._horaEncerramento = params.horaEncerramento;
    }

    public get dataInicio(): string {
        return this._dataInicio;
    }

    public get dataFim(): string {
        return this._dataFim;
    }

    public get horaInicio(): string {
        return this._horaInicio;
    }

    public get horaEncerramento(): string {
        return this._horaEncerramento;
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
        return `DatasEventoVO(dataInicio=${this._dataInicio}, dataFim=${this._dataFim}, horaInicio=${this._horaInicio}, horaEncerramento=${this._horaEncerramento})`;
    }

    public static instanciar(params: InstanciarDatasVOParams): DatasEventoVO {
        this.instanciarDataInicio(params.dataInicio);
        this.instanciarDataFim(params.dataFim);
        this.instanciarHoraInicio(params.horaInicio);
        this.instanciarHoraEncerramento(params.horaEncerramento);
        this.compararDatas(params.dataInicio, params.dataFim);
        this.compararHoras(params.horaInicio, params.horaEncerramento);

        return new DatasEventoVO({
            dataInicio: params.dataInicio,
            dataFim: params.dataFim,
            horaInicio: params.horaInicio,
            horaEncerramento: params.horaEncerramento
        });
    }

    private static instanciarDataInicio(dataInicio?: string): void {
        try{
            ValidadorString
                .instanciar(dataInicio, "A data de início do evento está em branco.")
                .preenchida("A data de início do evento está em branco.")
                .compativelComRegex(this.REGEX_DATA, "A data de início do evento está com o formato inválido.");
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new DatasEventoVOInvalidaException(erro.message);
        }
    }

    private static instanciarDataFim(dataFim?: string): void {
        try{
            ValidadorString
                .instanciar(dataFim, "A data de encerramento do evento está em branco.")
                .preenchida("A data de encerramento do evento está em branco.")
                .compativelComRegex(this.REGEX_DATA, "A data de encerramento do evento está com o formato inválido.");
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new DatasEventoVOInvalidaException(erro.message);
        }
    }

    private static instanciarHoraInicio(horaInicio?: string): void {
        try{
            ValidadorString
                .instanciar(horaInicio, "A hora de início do evento está em branco.")
                .preenchida("A hora de início do evento está em branco.")
                .compativelComRegex(this.REGEX_HORA, "A hora de início do evento está com o formato inválido.");
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new DatasEventoVOInvalidaException(erro.message);
        }
    }

    private static instanciarHoraEncerramento(horaEncerramento?: string): void {
        try{
            ValidadorString
                .instanciar(horaEncerramento, "A hora de encerramento do evento está em branco.")
                .preenchida("A hora de encerramento do evento está em branco.")
                .compativelComRegex(this.REGEX_HORA, "A hora de encerramento do evento está com o formato inválido.");
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new DatasEventoVOInvalidaException(erro.message);
        }
    }

    private static compararDatas(strDataInicio: string, strDataFim: string): void {
        const dataInicio = new Date(strDataInicio);
        const dataFim = new Date(strDataFim);

        if(dataInicio > dataFim)
            throw new DatasEventoVOInvalidaException("A data de início do evento é maior que a data de encerramento do evento.");
    }

    private static compararHoras(strHoraInicio: string, strHoraEncerramento: string): void {
        const hoje = new Date().toISOString().split("T")[0];
        const horaInicio = new Date(`${hoje}T${strHoraInicio}.000Z`);
        const horaEncerramento = new Date(`${hoje}T${strHoraEncerramento}.000Z`);

        if(horaInicio > horaEncerramento)
            throw new DatasEventoVOInvalidaException("A hora de início do evento é maior que a hora de encerramento do evento.");
    }
}

export { DatasEventoVO, InstanciarDatasVOParams };
