import { BaseDTO } from "@/aplicacao/abstracoes/dto/base.dto";

type TipoMensagem = "SUCESSO" | "ERRO";

interface Mensagem extends BaseDTO {
    tipo: TipoMensagem;
    texto: string;
};

export { Mensagem, TipoMensagem };
