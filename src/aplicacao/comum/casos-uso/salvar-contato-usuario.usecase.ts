import { NovoContatoUsuarioDTO } from "@/aplicacao/comum/dto/contato-usuario.dto";
import { ContatosUsuariosRepository } from "@/aplicacao/comum/repositorios/contatos-usuarios.repository";
import { IdentificadorFactory } from "@/dominio/abstracoes/identificadores/identificador.factory";
import { ContatoUsuarioId } from "@/dominio/comum/identificadores/contato-usuario.identificador";
import { ContatoUsuario } from "@/dominio/comum/modelos/contato-usuario.model";

type SalvarContatoUsuarioParams = {
    repository: ContatosUsuariosRepository;
    contatoIdFactory: IdentificadorFactory<ContatoUsuarioId>;
};

class SalvarContatoUsuario {

    private readonly _repository: ContatosUsuariosRepository;

    private readonly _contatoIdFactory: IdentificadorFactory<ContatoUsuarioId>;

    public constructor(params: SalvarContatoUsuarioParams){
        this._repository = params.repository;
        this._contatoIdFactory = params.contatoIdFactory;
    }

    public async executar(input: NovoContatoUsuarioDTO): Promise<void> {
        const idContato = await this._contatoIdFactory.gerarNovoId();
        const novoContato = ContatoUsuario.instanciar({
            id: idContato,
            nome: input.nome,
            email: input.email,
            telefone: input.telefone,
            texto: input.telefone,
            tipoUsuario: input.tipo_usuario,
            tipoContato: input.tipo_contato,
            dataContato: new Date()
        });
        await this._repository.salvar(novoContato);
    }
}

export { SalvarContatoUsuario };
