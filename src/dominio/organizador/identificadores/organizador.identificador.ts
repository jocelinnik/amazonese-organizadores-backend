import { Identificador } from "@/dominio/abstracoes/identificadores/identificador";
import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";
import { ValidadorString } from "@/dominio/comum/validadores/string.validador";
import { CpfCnpjOrganizadorInvalidoException } from "@/dominio/organizador/excecoes/identificadores/organizador.exception";

class CpfCnpjOrganizador extends Identificador<string> {

    private constructor(valor: string){
        super(valor);
    }

    public static instanciar(valor: string): CpfCnpjOrganizador {
        try{
            if(valor.length !== 11 && valor.length !== 14)
                throw new ValidacaoRejeitadaException("O CPF/CNPJ do organizador deve ter exatamente 11 (CPF) ou 14 (CNPJ) caracteres.");

            if(valor.length === 11)
                this.consegueInstanciarCpf(valor);
            else
                this.consegueInstanciarCnpj(valor);

            return new CpfCnpjOrganizador(valor);
        }catch(e: any){
            const erro = e as ValidacaoRejeitadaException;

            throw new CpfCnpjOrganizadorInvalidoException(erro.message);
        }
    }

    private static consegueInstanciarCpf(valor?: string): void {
        ValidadorString
            .instanciar(valor, "O CPF do organizador está em branco.")
            .preenchida("O CPF do organizador está em branco.")
            .cpf("O CPF do organizador deve ter apenas caracteres numéricos.");
    }

    private static consegueInstanciarCnpj(valor?: string): void {
        ValidadorString
            .instanciar(valor, "O CNPJ do organizador está em branco.")
            .preenchida("O CNPJ do organizador está em branco.")
            .cpf("O CNPJ do organizador deve ter apenas caracteres numéricos.");
    }
}

export { CpfCnpjOrganizador };
