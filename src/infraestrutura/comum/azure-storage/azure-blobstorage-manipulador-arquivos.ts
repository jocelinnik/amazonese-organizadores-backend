import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

import { Arquivo, ManipuladorArquivos } from "@/aplicacao/comum/providers/manipulador-arquivos";

type AzureBlobStorageManipuladorArquivosParams = {
    asaConnectionString: string;
    nomeContainer: string;
    containerBaseURL: string;
};

class AzureBlobStorageManipuladorArquivos implements ManipuladorArquivos {

    private readonly _container: ContainerClient;

    private readonly _nomeContainer: string;

    private readonly _containerBaseURL: string;

    public constructor(params: AzureBlobStorageManipuladorArquivosParams){
        const conexao = BlobServiceClient.fromConnectionString(params.asaConnectionString);

        this._container = conexao.getContainerClient(params.nomeContainer);
        this._nomeContainer = params.nomeContainer;
        this._containerBaseURL = params.containerBaseURL;
    }

    public async salvar(arquivo: Arquivo, novoNome?: string): Promise<string> {
        const nomeArquivo = (
            (novoNome)
                ? `${novoNome}.${arquivo.extensao}`
                : arquivo.nome
        );

        const block = this._container.getBlockBlobClient(nomeArquivo);
        const resposta = await block.uploadData(arquivo.conteudo, {
            blobHTTPHeaders: {
                blobContentType: arquivo.tipo
            }
        });

        if(resposta._response.status !== 201)
            throw new Error("Erro ao tentar subir arquivo para o Azure Blob Storage.");

        return `${this._containerBaseURL}/${this._nomeContainer}/${nomeArquivo}`;
    }
}

export { AzureBlobStorageManipuladorArquivos };
