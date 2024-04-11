interface CifradorSegredos {

    criptografar(segredo: string): Promise<string>;

    comparar(segredoBruto: string, segredoCifrado: string): Promise<boolean>;

}

export { CifradorSegredos };
