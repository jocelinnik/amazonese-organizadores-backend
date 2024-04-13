import { BaseVO } from "@/dominio/abstracoes/value-objects/base.vo";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";
import { EmailVOInvalidoException } from "@/dominio/comum/excecoes/value-objects/email.exception";

class EmailVO implements BaseVO {

    private readonly _valor: string;

    private constructor(valor: string){
        this._valor = valor;
    }

    public get valor(): string {
        return this._valor;
    }

    public equals(o: BaseVO): boolean {
        let igual = false;

        if(o instanceof EmailVO){
            const outro = o as EmailVO;
            igual = (this._valor === outro._valor);
        }

        return igual;
    }

    public toString(): string {
        return `EmailVO(${this._valor})`;
    }

    public static instanciar(valor?: string): EmailVO {
        try{
            ValidadorString
                .instanciar(valor, "O endereço de e-mail está em branco.")
                .preenchida("O endereço de e-mail está em branco.")
                .email("O endereço de e-mail está com o formato inválido.");

            return new EmailVO(valor);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new EmailVOInvalidoException(erro.message);
        }
    }
}

export { EmailVO };
