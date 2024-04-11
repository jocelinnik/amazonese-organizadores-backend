import { BaseVO } from "@/dominio/abstracoes/value-objects/base.vo";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";
import { NomeVOInvalidoException } from "@/dominio/organizador/excecoes/value-objects/nome.exception";

class NomeVO implements BaseVO {

    private readonly _valor: string;

    private constructor(valor: string){
        this._valor = valor;
    }

    public get valor(): string {
        return this._valor;
    }

    public equals(o: BaseVO): boolean {
        let igual = false;

        if(o instanceof NomeVO){
            const outro = o as NomeVO;
            igual = (this._valor === outro._valor);
        }

        return igual;
    }

    public toString(): string {
        return `NomeVO(${this._valor})`;
    }

    public static instanciar(valor?: string): NomeVO {
        try{
            ValidadorString
                .instanciar(valor, "O nome está em branco.")
                .preenchida("O nome está em branco.")
                .temPeloMenos(3, "O nome deve ter pelo menos 3 caracteres.");

            return new NomeVO(valor);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new NomeVOInvalidoException(erro.message);
        }
    }
}

export { NomeVO };
