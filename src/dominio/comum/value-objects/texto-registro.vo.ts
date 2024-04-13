import { BaseVO } from "@/dominio/abstracoes/value-objects/base.vo";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { TextoRegistroVOInvalidoException } from "@/dominio/comum/excecoes/value-objects/texto-registro.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";

class TextoRegistroVO implements BaseVO {

    private readonly _valor: string;

    private constructor(valor: string){
        this._valor = valor;
    }

    public get valor(): string {
        return this._valor;
    }

    public equals(o: BaseVO): boolean {
        let igual = false;

        if(o instanceof TextoRegistroVO){
            const outro = o as TextoRegistroVO;
            igual = (this._valor === outro._valor);
        }

        return igual;
    }

    public toString(): string {
        return `TextoRegistroVO(${this._valor})`;
    }

    public static instanciar(valor?: string): TextoRegistroVO {
        try{
            ValidadorString
                .instanciar(valor, "O texto está em branco.")
                .preenchida("O texto está em branco.");
            
            return new TextoRegistroVO(valor);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new TextoRegistroVOInvalidoException(erro.message);
        }
    }
}

export { TextoRegistroVO };
