import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";
import { OrganizadorException } from "@/dominio/organizador/excecoes/modelos/organizador.exception";
import { CpfCnpjOrganizador } from "@/dominio/organizador/identificadores/organizador.identificador";
import { EmailVO } from "@/dominio/organizador/value-objects/email.vo";
import { FraseSecretaVO } from "@/dominio/organizador/value-objects/frase-secreta.vo";
import { NomeVO } from "@/dominio/organizador/value-objects/nome.vo";
import { SenhaVO } from "@/dominio/organizador/value-objects/senha.vo";
import { TelefoneVO } from "@/dominio/organizador/value-objects/telefone.vo";

type NewOrganizadorParams = {
    cpfOuCnpj: CpfCnpjOrganizador;
    nome: NomeVO;
    email: EmailVO;
    telefone: TelefoneVO;
    senha: SenhaVO;
    fraseSecreta: FraseSecretaVO;
};
type InstanciarOrganizadorParams = {
    cpfOuCnpj: CpfCnpjOrganizador;
    nome?: string;
    email?: string;
    telefone?: string;
    senha?: string;
    fraseSecreta?: string;
};

class Organizador {

    private readonly _cpfOuCnpj: CpfCnpjOrganizador;
    private _nome: NomeVO;
    private _email: EmailVO;
    private _telefone: TelefoneVO;
    private _senha: SenhaVO;
    private _fraseSecreta: FraseSecretaVO;

    private constructor(params: NewOrganizadorParams){
        this._cpfOuCnpj = params.cpfOuCnpj;
        this._nome = params.nome;
        this._email = params.email;
        this._telefone = params.telefone;
        this._senha = params.senha;
        this._fraseSecreta = params.fraseSecreta;
    }

    public get cpfOuCnpj(): CpfCnpjOrganizador {
        return this._cpfOuCnpj;
    }

    public get nome(): NomeVO {
        return this._nome;
    }

    public set nome(novoNome: NomeVO) {
        this._nome = novoNome;
    }

    public get email(): EmailVO {
        return this._email;
    }

    public set email(novoEmail: EmailVO) {
        this._email = novoEmail;
    }

    public get telefone(): TelefoneVO {
        return this._telefone;
    }

    public set telefone(novoTelefone: TelefoneVO) {
        this._telefone = novoTelefone;
    }

    public get senha(): SenhaVO {
        return this._senha;
    }

    public set senha(novaSenha: SenhaVO) {
        this._senha = novaSenha;
    }

    public get fraseSecreta(): FraseSecretaVO {
        return this._fraseSecreta;
    }

    public set fraseSecreta(novaFraseSecreta: FraseSecretaVO) {
        this._fraseSecreta = novaFraseSecreta;
    }

    public static instanciar(params: InstanciarOrganizadorParams): Organizador {
        try{
            return new Organizador({
                cpfOuCnpj: params.cpfOuCnpj,
                nome: NomeVO.instanciar(params.nome),
                email: EmailVO.instanciar(params.email),
                telefone: TelefoneVO.instanciar(params.telefone),
                senha: SenhaVO.instanciar(params.senha),
                fraseSecreta: FraseSecretaVO.instanciar(params.fraseSecreta)
            });
        }catch(e: any){
            const voErro = e as BaseVOException;

            throw new OrganizadorException("Não foi possível instanciar um organizador.", voErro);
        }
    }
}

export { Organizador };
