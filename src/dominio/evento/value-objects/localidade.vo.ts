import { BaseVO } from "@/dominio/abstracoes/value-objects/base.vo";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";
import { LocalidadeVOInvalidaException } from "@/dominio/evento/excecoes/value-objects/localidade.exception";

type NewLocalidadeVOParams = {
    cidade: string;
    uf: string;
};
type InstanciarLocalidadeVOParams = {
    cidade?: string;
    uf?: string;
};

class LocalidadeVO implements BaseVO {

    private readonly _cidade: string;;
    private readonly _uf: string;

    private constructor(params: NewLocalidadeVOParams){
        this._cidade = params.cidade;
        this._uf = params.uf;
    }

    public get cidade(): string {
        return this._cidade;
    }

    public get uf(): string {
        return this._uf;
    }

    public equals(o: BaseVO): boolean {
        let igual = false;

        if(o instanceof LocalidadeVO){
            const outro = o as LocalidadeVO;
            igual = (
                (this._cidade === outro._cidade) && 
                (this._uf === outro._uf)
            );
        }

        return igual;
    }

    public toString(): string {
        return `LocalidadeVO(cidade=${this._cidade}, uf=${this._uf})`;
    }

    public static instanciar(params: InstanciarLocalidadeVOParams): LocalidadeVO {
        try{
            ValidadorString
                .instanciar(params.cidade, "A cidade do evento está em branco.")
                .preenchida("A cidade do evento está em branco.")
                .temPeloMenos(3, "A cidade do evento deve ter pelo menos 3 caracteres.");

            ValidadorString
                .instanciar(params.uf, "A UF do evento está em branco.")
                .preenchida("A UF do evento está em branco.")
                .temExatamente(2, "A UF do evento deve ter exatamente 2 caracteres.");

            return new LocalidadeVO({ cidade: params.cidade, uf: params.uf });
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new LocalidadeVOInvalidaException(erro.message);
        }
    }
}

export { LocalidadeVO, InstanciarLocalidadeVOParams };
