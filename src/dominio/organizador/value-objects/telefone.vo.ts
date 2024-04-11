import { BaseVO } from "@/dominio/abstracoes/value-objects/base.vo";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";
import { TelefoneVOInvalidoException } from "@/dominio/organizador/excecoes/value-objects/telefone.exception";

class TelefoneVO implements BaseVO {

    private readonly _valor: string;

    private constructor(valor: string){
        this._valor = valor;
    }

    public get valor(): string {
        return this._valor;
    }

    public equals(o: BaseVO): boolean {
        let igual = false;

        if(o instanceof TelefoneVO){
            const outro = o as TelefoneVO;
            igual = (this._valor === outro._valor);
        }

        return igual;
    }

    public toString(): string {
        return `TelefoneVO(${this._valor})`;
    }

    public static instanciar(valor?: string): TelefoneVO {
        try{
            ValidadorString
                .instanciar(valor, "O número de telefone está em branco.")
                .preenchida("O número de telefone está em branco.")
                .temExatamente(13, "O número de telefone deve ter exatamente 13 caracteres.")
                .telefone("O número de telefone deve ter apenas caracteres numéricos.");

            return new TelefoneVO(valor);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new TelefoneVOInvalidoException(erro.message);
        }
    }
}

export { TelefoneVO };
