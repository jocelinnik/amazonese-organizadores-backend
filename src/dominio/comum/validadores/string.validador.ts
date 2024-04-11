import { ValidacaoRejeitadaException } from "@/dominio/comum/excecoes/validadores/validador.exception";

class ValidadorString {

    private readonly _valor: string;

    private constructor(valor: string){
        this._valor = valor;
    }

    public preenchida(mensagem: string = "O valor textual está em branco."): ValidadorString {
        if(this._valor.length === 0 || this._valor.trim().length === 0)
            throw new ValidacaoRejeitadaException(mensagem);

        return this;
    }

    public cpf(mensagem: string = "O CPF deve ter apenas caracteres numéricos."): ValidadorString {
        const regex = /[0-9]{11}/;

        if(!regex.test(this._valor))
            throw new ValidacaoRejeitadaException(mensagem);

        return this;
    }

    public cnpj(mensagem: string = "O CNPJ deve ter apenas caracteres numéricos."): ValidadorString {
        const regex = /[0-9]{14}/;

        if(!regex.test(this._valor))
            throw new ValidacaoRejeitadaException(mensagem);

        return this;
    }

    public email(mensagem: string = "O endereço de e-mail está com o formato inválido."): ValidadorString {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!regex.test(this._valor))
            throw new ValidacaoRejeitadaException(mensagem);

        return this;
    }

    public telefone(mensagem = "O número de telefone está com o formato inválido."): ValidadorString {
        const regex = /55[1-9]{2}9[0-9]{8}/;

        if(!regex.test(this._valor))
            throw new ValidacaoRejeitadaException(mensagem);

        return this;
    }

    public compativelComRegex(regex: RegExp, mensagem = "O valor textual não confere com o formato especificado."): ValidadorString {
        if(!regex.test(this._valor))
            throw new ValidacaoRejeitadaException(mensagem);

        return this;
    }

    public temExatamente(tamanho: number, mensagem = "O Valor textual não tem o tamanho exato."): ValidadorString {
        if(this._valor.length !== tamanho)
            throw new ValidacaoRejeitadaException(mensagem);

        return this;
    }

    public temPeloMenos(tamanhoMinimo: number, mensagem = "O Valor textual não tem o tamanho mínimo."): ValidadorString {
        if(this._valor.length < tamanhoMinimo)
            throw new ValidacaoRejeitadaException(mensagem);

        return this;
    }

    public temNoMaximo(tamanhoMaximo: number, mensagem = "O Valor textual não tem o tamanho máximo."): ValidadorString {
        if(this._valor.length > tamanhoMaximo)
            throw new ValidacaoRejeitadaException(mensagem);

        return this;
    }

    public static instanciar(valor?: any, mensagem: string = "O valor passado não é textual."): ValidadorString {
        if(!valor || typeof valor !== "string")
            throw new ValidacaoRejeitadaException(mensagem);

        return new ValidadorString(valor);
    }
}

export { ValidadorString };
