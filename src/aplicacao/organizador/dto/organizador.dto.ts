import { TokenAutenticacaoDTO } from "@/aplicacao/organizador/dto/token-autenticacao.dto";

interface NovoOrganizadorDTO {
    cpf_cnpj: string;
    nome: string;
    email: string;
    telefone: string;
    senha_bruta: string;
    frase_secreta_bruta: string;
}

interface LoginOrganizadorDTO {
    cpf_cnpj: string;
    senha_bruta: string;
}

interface RedefinirSenhaOrganizadorDTO {
    cpf_cnpj: string;
    frase_secreta_bruta: string;
    nova_senha_bruta: string;
}

interface DadosOrganizadorLogadoDTO {
    cpf_cnpj: string;
    nome: string;
}

interface OrganizadorLogadoDTO {
    organizador: DadosOrganizadorLogadoDTO;
    token: TokenAutenticacaoDTO;
}

export {
    DadosOrganizadorLogadoDTO,
    LoginOrganizadorDTO,
    NovoOrganizadorDTO,
    OrganizadorLogadoDTO,
    RedefinirSenhaOrganizadorDTO
};
