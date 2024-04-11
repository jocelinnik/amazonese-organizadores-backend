import { BaseVO } from "@/dominio/abstracoes/value-objects/base.vo";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";
import { DescricaoVOInvalidaException } from "@/dominio/evento/excecoes/value-objects/descricao.exception";

class DescricaoVO implements BaseVO {

    private readonly _valor: string;

    private constructor(valor: string){
        this._valor = valor;
    }

    public get valor(): string {
        return this._valor;
    }

    public equals(o: BaseVO): boolean {
        let igual = false;

        if(o instanceof DescricaoVO){
            const outro = o as DescricaoVO;
            igual = (this._valor === outro._valor);
        }

        return igual;
    }

    public toString(): string {
        return `DescricaoVO(${this._valor})`;
    }

    public static instanciar(valor?: string): DescricaoVO {
        try{
            ValidadorString
                .instanciar(valor, "A descrição do evento está em branco.")
                .preenchida("A descrição do evento está em branco.")
                .temPeloMenos(20, "A descrição do evento deve ter pelo menos 20 caracteres");

            return new DescricaoVO(valor);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new DescricaoVOInvalidaException(erro.message);
        }
    }
}

export { DescricaoVO };
