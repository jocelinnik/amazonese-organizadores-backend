import { Identificador } from "@/dominio/abstracoes/identificadores/identificador";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";
import { ImagemEventoIdInvalidoException } from "@/dominio/evento/excecoes/identificadores/imagem-evento.exception";

class ImagemEventoId extends Identificador<string> {

    private constructor(valor: string){
        super(valor);
    }

    public static instanciar(valor?: string): ImagemEventoId {
        try{
            ValidadorString
                .instanciar(valor, "O ID da imagem do evento está em branco.")
                .preenchida("O ID da imagem do evento está em branco.")
                .temPeloMenos(1, "O ID da imagem do evento deve ter pelo menos 1 caractere.");
            
            return new ImagemEventoId(valor);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new ImagemEventoIdInvalidoException(erro.message);
        }
    }
}

export { ImagemEventoId };
