abstract class BaseIdException extends Error {

    public constructor(mensagem: string = "ID inválido."){
        super(mensagem);
    }
}

export { BaseIdException };
