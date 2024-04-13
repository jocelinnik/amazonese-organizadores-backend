import { ContatoUsuario } from "@/dominio/comum/modelos/contato-usuario.model";

interface ContatosUsuariosRepository {

    salvar(contato: ContatoUsuario): Promise<void>;

}

export { ContatosUsuariosRepository };
