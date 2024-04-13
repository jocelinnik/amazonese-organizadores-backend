import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";
import { TipoContato } from "@/dominio/comum/enumeradores/tipo-contato.enum";
import { TipoUsuario } from "@/dominio/comum/enumeradores/tipo-usuario.enum";
import { ContatoUsuarioException } from "@/dominio/comum/excecoes/modelos/contato-usuario.exception";
import { ContatoUsuarioId } from "@/dominio/comum/identificadores/contato-usuario.identificador";
import { DataCriacaoVO } from "@/dominio/comum/value-objects/data-criacao.vo";
import { EmailVO } from "@/dominio/comum/value-objects/email.vo";
import { NomeVO } from "@/dominio/comum/value-objects/nome.vo";
import { TelefoneVO } from "@/dominio/comum/value-objects/telefone.vo";
import { TextoRegistroVO } from "@/dominio/comum/value-objects/texto-registro.vo";

type NewContatoUsuarioParams = {
    id: ContatoUsuarioId;
    nome: NomeVO;
    email: EmailVO;
    telefone: TelefoneVO;
    tipoUsuario: TipoUsuario;
    tipoContato: TipoContato;
    texto: TextoRegistroVO;
    dataContato: DataCriacaoVO;
};
type InstanciarContatoUsuarioParams = {
    id: ContatoUsuarioId;
    nome?: string;
    email?: string;
    telefone?: string;
    texto?: string;
    tipoUsuario: TipoUsuario;
    tipoContato: TipoContato;
    dataContato: Date;
};

class ContatoUsuario {

    private readonly _id: ContatoUsuarioId;
    private readonly _nome: NomeVO;
    private readonly _email: EmailVO;
    private readonly _telefone: TelefoneVO;
    private readonly _tipoUsuario: TipoUsuario;
    private readonly _tipoContato: TipoContato;
    private readonly _texto: TextoRegistroVO;
    private readonly _dataContato: DataCriacaoVO;

    private constructor(params: NewContatoUsuarioParams){
        this._id = params.id;
        this._nome = params.nome;
        this._email = params.email;
        this._telefone = params.telefone;
        this._tipoUsuario = params.tipoUsuario;
        this._tipoContato = params.tipoContato;
        this._texto = params.texto;
        this._dataContato = params.dataContato;
    }

    public get id(): ContatoUsuarioId {
        return this._id;
    }

    public get nome(): NomeVO {
        return this._nome;
    }

    public get email(): EmailVO {
        return this._email;
    }

    public get telefone(): TelefoneVO {
        return this._telefone;
    }

    public get tipoUsuario(): TipoUsuario {
        return this._tipoUsuario;
    }

    public get tipoContato(): TipoContato {
        return this._tipoContato;
    }

    public get texto(): TextoRegistroVO {
        return this._texto;
    }

    public get dataContato(): DataCriacaoVO {
        return this._dataContato;
    }

    public static instanciar(params: InstanciarContatoUsuarioParams): ContatoUsuario {
        try{
            return new ContatoUsuario({
                id: params.id,
                nome: NomeVO.instanciar(params.nome),
                email: EmailVO.instanciar(params.email),
                telefone: TelefoneVO.instanciar(params.telefone),
                texto: TextoRegistroVO.instanciar(params.texto),
                tipoUsuario: params.tipoUsuario,
                tipoContato: params.tipoContato,
                dataContato: DataCriacaoVO.instanciar(params.dataContato)
            });
        }catch(e: any){
            if(e instanceof BaseVOException)
                throw new ContatoUsuarioException("Não foi possível instanciar um organizador.", e);
            else
                throw new ContatoUsuarioException(`Não foi possível instanciar um organizador: ${(e as Error).message}`);
        }
    }
}

export { ContatoUsuario };
