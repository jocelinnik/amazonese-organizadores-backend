import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";

class ValidadorNumerico {

    private readonly _valor: number;

    private constructor(valor: number){
        this._valor = valor;
    }

    public ehPositivo(mensagem: string = "O valor passado não é positivo."): ValidadorNumerico {
        if(this._valor < 0)
            throw new ValidacaoRejeitadaException(mensagem);

        return this;
    }

    public ehInteiro(mensagem: string = "O valor passado não é inteiro."): ValidadorNumerico {
        if(!Number.isInteger(this._valor))
            throw new ValidacaoRejeitadaException(mensagem);

        return this;
    }

    public static instanciar(valor?: any, mensagem: string = "O valor passado não é um número."): ValidadorNumerico {
        if(typeof valor !== "number")
            throw new ValidacaoRejeitadaException(mensagem);

        return new ValidadorNumerico(valor);
    }
}

export { ValidadorNumerico };
