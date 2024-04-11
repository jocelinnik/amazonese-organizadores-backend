import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import { Arquivo, ManipuladorArquivos } from "@/aplicacao/comum/providers/manipulador-arquivos";

type ManipuladorArquivosLocalParams = {
    caminho: string;
    arquivoBaseURL: string;
};

class ManipuladorArquivosLocal implements ManipuladorArquivos {

    private readonly _caminho: string;

    private readonly _arquivoBaseURL: string;

    public constructor(params: ManipuladorArquivosLocalParams){
        this._caminho = params.caminho;
        this._arquivoBaseURL = params.arquivoBaseURL;
    }

    public async salvar(arquivo: Arquivo, novoNome?: string): Promise<string> {
        const nomeArquivo = (
            (novoNome)
                ? `${novoNome}.${arquivo.extensao}`
                : arquivo.nome
        );
        const caminhoArquivo = join(this._caminho, nomeArquivo);

        try{
            await writeFile(caminhoArquivo, Buffer.from(arquivo.conteudo));

            return `${this._arquivoBaseURL}/${nomeArquivo}`;
        }catch(e: any){
            throw new Error(`Falha ao tentar salvar o arquivo no diretorio ${this._caminho}: ${e}`);
        }
    }
}

export { ManipuladorArquivosLocal };
