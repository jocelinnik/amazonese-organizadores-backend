import { BaseVOException } from "./vo.exception";

abstract class BaseModelException extends Error {

    private readonly _causa?: BaseVOException;

    public constructor(mensagem: string, causa?: BaseVOException){
        super(mensagem);

        this._causa = causa;
    }

    public get causa(): BaseVOException | undefined {
        return this._causa;
    }
}

export { BaseModelException };
