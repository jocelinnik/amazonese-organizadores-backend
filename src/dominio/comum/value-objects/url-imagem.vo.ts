import { BaseVO } from "@/dominio/abstracoes/value-objects/base.vo";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { UrlImagemVOInvalidoException } from "@/dominio/comum/excecoes/value-objects/url-imagem.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";

class UrlImagemVO implements BaseVO {

    private readonly _valor: string;

    private constructor(valor: string){
        this._valor = valor;
    }

    public get valor(): string {
        return this._valor;
    }

    public equals(o: BaseVO): boolean {
        let igual = false;

        if(o instanceof UrlImagemVO){
            const outro = o as UrlImagemVO;
            igual = (this._valor === outro._valor);
        }

        return igual;
    }

    public toString(): string {
        return `UrlImagemVO(${this._valor})`;
    }

    public static instanciar(valor?: string): UrlImagemVO {
        try{
            ValidadorString
                .instanciar(valor, "A URL da imagem está em branco.")
                .preenchida("A URL da imagem está em branco.");
            
            return new UrlImagemVO(valor);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new UrlImagemVOInvalidoException(erro.message);
        }
    }
}

export { UrlImagemVO };
