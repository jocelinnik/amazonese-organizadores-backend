import { TipoContato } from "@/dominio/comum/enumeradores/tipo-contato.enum";
import { TipoUsuario } from "@/dominio/comum/enumeradores/tipo-usuario.enum";

interface NovoContatoUsuarioDTO {
    nome: string;
    email: string;
    telefone: string;
    tipo_usuario: TipoUsuario;
    tipo_contato: TipoContato;
    texto: string;
}

export { NovoContatoUsuarioDTO };
