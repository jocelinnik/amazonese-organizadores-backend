import { RedefinirSenhaOrganizadorDTO } from "@/aplicacao/organizador/dto/organizador.dto";
import { CifradorSegredos } from "@/aplicacao/organizador/providers/cifrador-segredos";
import { CpfCnpjOrganizador } from "@/dominio/organizador/identificadores/organizador.identificador";
import { OrganizadoresRepository } from "@/dominio/organizador/repositorios/organizadores.repository";
import { SenhaVO } from "@/dominio/organizador/value-objects/senha.vo";

type RedefinirSenhaOrganizadorParams = {
    cifradorSenha: CifradorSegredos;
    cifradorFraseSecreta: CifradorSegredos;
    repository: OrganizadoresRepository;
};

class RedefinirSenhaOrganizador {

    private _cifradorSenha: CifradorSegredos;

    private _cifradorFraseSecreta: CifradorSegredos;

    private _repository: OrganizadoresRepository;

    public constructor(params: RedefinirSenhaOrganizadorParams){
        this._cifradorSenha = params.cifradorSenha;
        this._cifradorFraseSecreta = params.cifradorFraseSecreta;
        this._repository = params.repository;
    }

    public async executar(input: RedefinirSenhaOrganizadorDTO): Promise<void> {
        const cpfOuCnpj = CpfCnpjOrganizador.instanciar(input.cpf_cnpj);
        const dadosOrganizador = await this._repository.buscarPorCpfCnpj(cpfOuCnpj);

        if(!await this._cifradorFraseSecreta.comparar(input.frase_secreta_bruta, dadosOrganizador.fraseSecreta.valor))
            throw new Error("A frase secreta fornecida está incorreta");

        const novaSenhaCifrada = await this._cifradorSenha.criptografar(input.nova_senha_bruta);
        dadosOrganizador.senha = SenhaVO.instanciar(novaSenhaCifrada);

        await this._repository.salvar(dadosOrganizador);
    }
}

export { RedefinirSenhaOrganizador };
