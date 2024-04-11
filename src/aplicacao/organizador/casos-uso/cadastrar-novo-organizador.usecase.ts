import { NovoOrganizadorDTO } from "@/aplicacao/organizador/dto/organizador.dto";
import { CifradorSegredos } from "@/aplicacao/organizador/providers/cifrador-segredos";
import { BaseModelException } from "@/dominio/abstracoes/excecoes/model.exception";
import { CpfCnpjOrganizador } from "@/dominio/organizador/identificadores/organizador.identificador";
import { Organizador } from "@/dominio/organizador/modelos/organizador.model";
import { OrganizadoresRepository } from "@/dominio/organizador/repositorios/organizadores.repository";

type CadastrarNovoOrganizadorParams = {
    cifradorSenha: CifradorSegredos;
    cifradorFraseSecreta: CifradorSegredos;
    repository: OrganizadoresRepository;
};

class CadastrarNovoOrganizador {

    private _cifradorSenha: CifradorSegredos;

    private _cifradorFraseSecreta: CifradorSegredos;

    private _repository: OrganizadoresRepository;

    public constructor(params: CadastrarNovoOrganizadorParams){
        this._cifradorSenha = params.cifradorSenha;
        this._cifradorFraseSecreta = params.cifradorFraseSecreta;
        this._repository = params.repository;
    }

    public async executar(input: NovoOrganizadorDTO): Promise<void> {
        try{
            const fraseSecretaCifrada = await this._cifradorFraseSecreta.criptografar(input.frase_secreta_bruta);
            const senhaCifrada = await this._cifradorSenha.criptografar(input.senha_bruta);
            const cpfOuCnpj = CpfCnpjOrganizador.instanciar(input.cpf_cnpj);
            const novoOrganizador = Organizador.instanciar({
                cpfOuCnpj: cpfOuCnpj,
                nome: input.nome,
                email: input.email,
                telefone: input.telefone,
                senha: senhaCifrada,
                fraseSecreta: fraseSecretaCifrada
            });

            await this._repository.salvar(novoOrganizador);
        }catch(e: any){
            const erro = e as BaseModelException;

            throw new Error(erro.causa.message);
        }
    }
}

export { CadastrarNovoOrganizador };
