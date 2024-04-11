abstract class BaseRepositoryException extends Error {

    private readonly _causa?: Error;

    public constructor(mensagem: string, causa?: Error){
        super(mensagem);

        this._causa = causa;
    }

    public get causa(): Error | undefined {
        return this._causa;
    }
}

export { BaseRepositoryException };
