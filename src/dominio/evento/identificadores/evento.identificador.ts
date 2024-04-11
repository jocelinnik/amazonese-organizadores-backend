import { Identificador } from "@/dominio/abstracoes/identificadores/identificador";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";
import { EventoIdInvalidoException } from "@/dominio/evento/excecoes/identificadores/evento.exception";

class EventoId extends Identificador<string> {

    private constructor(valor: string){
        super(valor);
    }

    public static instanciar(valor?: string): EventoId {
        try{
            ValidadorString
                .instanciar(valor, "O ID do evento está em branco.")
                .preenchida("O ID do evento está em branco.")
                .temPeloMenos(1, "O ID do evento deve ter pelo menos 1 caractere.");

            return new EventoId(valor);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new EventoIdInvalidoException(erro.message);
        }
    }
}

export { EventoId };
