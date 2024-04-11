import { BaseIdException } from "@/dominio/abstracoes/excecoes/identificador.exception";

class CpfCnpjOrganizadorInvalidoException extends BaseIdException {

    public constructor(mensagem: string = "CPF/CNPJ do organizador inválido."){
        super(mensagem);
    }
}

export { CpfCnpjOrganizadorInvalidoException };
