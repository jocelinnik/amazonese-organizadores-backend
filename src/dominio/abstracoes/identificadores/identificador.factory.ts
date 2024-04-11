interface IdentificadorFactory<T> {

    gerarNovoId(): Promise<T>;

}

export { IdentificadorFactory };
