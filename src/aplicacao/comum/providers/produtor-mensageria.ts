interface ProdutorMensageria {

    publicarMensagem(fila: string, msg: any): Promise<void>;

}

export { ProdutorMensageria };
