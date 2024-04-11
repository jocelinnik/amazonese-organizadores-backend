import { LoginOrganizadorDTO, OrganizadorLogadoDTO } from "@/aplicacao/organizador/dto/organizador.dto";
import { CifradorSegredos } from "@/aplicacao/organizador/providers/cifrador-segredos";
import { GerenciadorTokenAutenticacao } from "@/aplicacao/organizador/providers/gerenciador-tokens-autenticacao";
import { CpfCnpjOrganizador } from "@/dominio/organizador/identificadores/organizador.identificador";
import { OrganizadoresRepository } from "@/dominio/organizador/repositorios/organizadores.repository";

type RealizarLoginOrganizadorParams = {
    cifradorSenha: CifradorSegredos;
    gerenciadorToken: GerenciadorTokenAutenticacao;
    repository: OrganizadoresRepository;
};

class RealizarLoginOrganizador {

    private _repository: OrganizadoresRepository;

    private _cifradorSenha: CifradorSegredos;

    private _gerenciadorToken: GerenciadorTokenAutenticacao;

    public constructor(params: RealizarLoginOrganizadorParams){
        this._repository = params.repository;
        this._cifradorSenha = params.cifradorSenha;
        this._gerenciadorToken = params.gerenciadorToken;
    }

    public async executar(dadosLogin: LoginOrganizadorDTO): Promise<OrganizadorLogadoDTO> {
        const cpfOuCnpj = CpfCnpjOrganizador.instanciar(dadosLogin.cpf_cnpj);
        const dadosOrganizador = await this._repository.buscarPorCpfCnpj(cpfOuCnpj);

        if(!await this._cifradorSenha.comparar(dadosLogin.senha_bruta, dadosOrganizador.senha.valor))
            throw new Error("A senha de acesso está incorreta");

        const dadosOrganizadorToken = {
            cpf_cnpj: dadosOrganizador.cpfOuCnpj.valor,
            nome: dadosOrganizador.nome.valor
        };
        const token = await this._gerenciadorToken.gerarToken(dadosOrganizadorToken);

        return {
            organizador: dadosOrganizadorToken,
            token: token
        };
    }
}

export { RealizarLoginOrganizador };
