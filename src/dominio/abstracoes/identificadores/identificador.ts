abstract class Identificador<T> {

    private readonly _valor: T;

    public constructor(valor: T){
        this._valor = valor;
    }

    public get valor(): T {
        return this._valor;
    }
}

export { Identificador };
