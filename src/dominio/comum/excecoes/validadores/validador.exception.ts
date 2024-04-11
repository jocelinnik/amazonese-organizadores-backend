class ValidacaoRejeitadaException extends Error {

    public constructor(mensagem: string = "A validação do valor foi rejeitada."){
        super(mensagem);
    }
}

export { ValidacaoRejeitadaException };
