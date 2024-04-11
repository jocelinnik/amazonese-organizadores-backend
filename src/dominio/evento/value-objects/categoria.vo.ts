import { BaseVO } from "@/dominio/abstracoes/value-objects/base.vo";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";
import { CategoriaVOInvalidaException } from "@/dominio/evento/excecoes/value-objects/categoria.exception";

class CategoriaVO implements BaseVO {

    private readonly _valor: string;

    private constructor(valor: string){
        this._valor = valor;
    }

    public get valor(): string {
        return this._valor;
    }

    public equals(o: BaseVO): boolean {
        let igual = false;

        if(o instanceof CategoriaVO){
            const outro = o as CategoriaVO;
            igual = (this._valor === outro._valor);
        }

        return igual;
    }

    public toString(): string {
        return `CategoriaVO(${this._valor})`;
    }

    public static instanciar(valor?: string): CategoriaVO {
        try{
            ValidadorString
                .instanciar(valor, `A categoria ${valor} está em branco.`)
                .preenchida(`A categoria ${valor} está em branco.`)
                .temPeloMenos(3, `A categoria ${valor} deve ter pelo menos 3 caracteres.`);

            return new CategoriaVO(valor);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new CategoriaVOInvalidaException(erro.message);
        }
    }
}

export { CategoriaVO };
