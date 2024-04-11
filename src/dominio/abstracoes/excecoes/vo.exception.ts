abstract class BaseVOException extends Error {

    public constructor(mensagem: string = "Valor inválido."){
        super(mensagem);
    }
}

export { BaseVOException };
