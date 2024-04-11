import { BaseVO } from "@/dominio/abstracoes/value-objects/base.vo";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";
import { DataEventoFavoritoVOInvalidaException } from "@/dominio/evento/excecoes/value-objects/data-evento-favorito.exception";

class DataEventoFavoritoVO implements BaseVO {

    private readonly _valor: Date;

    private static readonly REGEX_DATA: RegExp = /((19|20)\d\d)-(0?[1-9]|1[012])-(0?[1-9]|[12]\d|3[01])/;

    private constructor(valor: Date){
        this._valor = valor;
    }

    public get valor(): Date {
        return this._valor;
    }

    public equals(o: BaseVO): boolean {
        let igual = false;

        if(o instanceof DataEventoFavoritoVO){
            const outro = o as DataEventoFavoritoVO;
            igual = (this._valor === outro._valor);
        }

        return igual;
    }

    public toString(): string {
        return `DataEventoFavoritoVO(${this._valor})`;
    }

    public static instanciar(valor?: string): DataEventoFavoritoVO {
        try{
            ValidadorString
                .instanciar(valor, "A data do evento favorito está em branco.")
                .preenchida("A data do evento favorito está em branco.")
                .compativelComRegex(this.REGEX_DATA, "A data do evento favorito está com o formato inválido.");

            return new DataEventoFavoritoVO(new Date(valor));
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new DataEventoFavoritoVOInvalidaException(erro.message);
        }
    }
}

export { DataEventoFavoritoVO };
