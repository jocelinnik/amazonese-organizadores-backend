import { Identificador } from "@/dominio/abstracoes/identificadores/identificador";
import { ContatoUsuarioIdInvalidoException } from "@/dominio/comum/excecoes/identificadores/contato-usuario.exception";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";

class ContatoUsuarioId extends Identificador<string> {

    private constructor(valor: string){
        super(valor);
    }

    public static instanciar(valor?: string): ContatoUsuarioId {
        try{
            ValidadorString
                .instanciar(valor, "O ID do contato está em branco.")
                .preenchida("O ID do contato está em branco.")
                .temPeloMenos(1, "O ID do contato deve ter pelo menos 1 caractere.");

            return new ContatoUsuarioId(valor);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new ContatoUsuarioIdInvalidoException(erro.message);
        }
    }
}

export { ContatoUsuarioId };
