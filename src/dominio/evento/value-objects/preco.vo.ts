import { BaseVO } from "@/dominio/abstracoes/value-objects/base.vo";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorNumerico } from "@/dominio/comum/validadores/numerico.validador";
import { PrecoVOInvalidoException } from "@/dominio/evento/excecoes/value-objects/preco.exception";

class PrecoVO implements BaseVO {

    private readonly _valor: number;

    private constructor(valor: number){
        this._valor = valor;
    }

    public get valor(): number {
        return this._valor;
    }

    public equals(o: BaseVO): boolean {
        let igual = false;

        if(o instanceof PrecoVO){
            const outro = o as PrecoVO;
            igual = (this._valor === outro._valor);
        }

        return igual;
    }

    public toString(): string {
        return `PrecoVO(${this._valor})`;
    }

    public static instanciar(valor?: number): PrecoVO {
        try{
            ValidadorNumerico
                .instanciar(valor, "O preço da entrada do evento está em branco.")
                .ehPositivo("O preço da entrada do evento deve ser um número positivo.");

            return new PrecoVO(valor);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new PrecoVOInvalidoException(erro.message);
        }
    }
}

export { PrecoVO };
