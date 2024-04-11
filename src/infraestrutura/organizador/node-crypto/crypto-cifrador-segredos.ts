import { pbkdf2Sync } from "node:crypto";

import { CifradorSegredos } from "@/aplicacao/organizador/providers/cifrador-segredos";

type CryptoCifradorSegredosParams = {
    algoritmo: string;
    segredo: string;
    iteracoes: number;
};

class CryptoCifradorSegredos implements CifradorSegredos {

    private _algoritmo: string;

    private _segredo: string;

    private _iteracoes: number;

    public constructor(params: CryptoCifradorSegredosParams){
        this._algoritmo = params.algoritmo;
        this._segredo = params.segredo;
        this._iteracoes = params.iteracoes;
    }

    public async criptografar(segredo: string): Promise<string> {
        return await this.executarAlgoritmo(segredo);
    }

    public async comparar(segredoBruto: string, segredoCifrado: string): Promise<boolean> {
        const senhaParaComparar = await this.executarAlgoritmo(segredoBruto);

        return senhaParaComparar === segredoCifrado;
    }

    private async executarAlgoritmo(segredo: string): Promise<string> {
        return pbkdf2Sync(segredo, this._segredo, this._iteracoes, 64, this._algoritmo).toString("hex");
    }
}

export { CryptoCifradorSegredos };
