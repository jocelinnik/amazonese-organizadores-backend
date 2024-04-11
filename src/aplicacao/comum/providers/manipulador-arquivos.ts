interface Arquivo {
    nome: string;
    tamanho: number;
    tipo: string;
    extensao: string;
    conteudo: ArrayBuffer;
}

interface ManipuladorArquivos {

    salvar(arquivo: Arquivo, novoNome?: string): Promise<string>;

}

export { Arquivo, ManipuladorArquivos };
