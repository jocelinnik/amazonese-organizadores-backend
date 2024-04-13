import { BaseVO } from "@/dominio/abstracoes/value-objects/base.vo";

class DataCriacaoVO implements BaseVO {

    private readonly _valor: Date;

    private constructor(valor: Date){
        this._valor = valor;
    }

    public get valor(): Date {
        return this._valor;
    }

    public equals(o: BaseVO): boolean {
        let igual = false;

        if(o instanceof DataCriacaoVO){
            const outro = o as DataCriacaoVO;
            igual = (this._valor === outro._valor);
        }

        return igual;
    }

    public toString(): string {
        return `DataCriacaoVO(${this._valor})`;
    }

    public static instanciar(valor?: Date): DataCriacaoVO {
        return new DataCriacaoVO(valor);
    }
}

export { DataCriacaoVO };
