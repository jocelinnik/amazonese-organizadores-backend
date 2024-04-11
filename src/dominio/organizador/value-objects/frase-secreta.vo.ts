import { BaseVO } from "@/dominio/abstracoes/value-objects/base.vo";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";
import { FraseSecretaVOInvalidaException } from "@/dominio/organizador/excecoes/value-objects/frase-secreta.exception";

class FraseSecretaVO implements BaseVO {

    private readonly _valor: string;

    private constructor(valor: string){
        this._valor = valor;
    }

    public get valor(): string {
        return this._valor;
    }

    public equals(o: BaseVO): boolean {
        let igual = false;

        if(o instanceof FraseSecretaVO){
            const outro = o as FraseSecretaVO;
            igual = (this._valor === outro._valor);
        }

        return igual;
    }

    public toString(): string {
        return `FraseSecretaVO(${this._valor})`;
    }

    public static instanciar(valor?: string): FraseSecretaVO {
        try{
            ValidadorString
                .instanciar(valor, "A frase secreta está em branco.")
                .preenchida("A frase secreta está em branco.");

            return new FraseSecretaVO(valor);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new FraseSecretaVOInvalidaException(erro.message);
        }
    }
}

export { FraseSecretaVO };
