import { BaseVO } from "@/dominio/abstracoes/value-objects/base.vo";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";
import { SenhaVOInvalidaException } from "@/dominio/organizador/excecoes/value-objects/senha.exception";

class SenhaVO implements BaseVO {

    private readonly _valor: string;

    private constructor(valor: string){
        this._valor = valor;
    }

    public get valor(): string {
        return this._valor;
    }

    public equals(o: BaseVO): boolean {
        let igual = false;

        if(o instanceof SenhaVO){
            const outro = o as SenhaVO;
            igual = (this._valor === outro._valor);
        }

        return igual;
    }

    public toString(): string {
        return `SenhaVO(${this._valor})`;
    }

    public static instanciar(valor?: string): SenhaVO {
        try{
            ValidadorString
                .instanciar(valor, "A senha de acesso está em branco.")
                .preenchida("A senha de acesso está em branco.");

            return new SenhaVO(valor);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new SenhaVOInvalidaException(erro.message);
        }
    }
}

export { SenhaVO };
