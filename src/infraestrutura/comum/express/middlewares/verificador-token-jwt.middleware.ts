import { NextFunction, Request, Response } from "express";

import { Mensagem } from "@/aplicacao/comum/dto/mensagem.dto";
import { GerenciadorTokenAutenticacao } from "@/aplicacao/organizador/providers/gerenciador-tokens-autenticacao";

type VerificadorTokenJWTParams = {
    gerenciadorTokens: GerenciadorTokenAutenticacao;
};

class VerificadorTokenJWT {

    private _gerenciadorTokens: GerenciadorTokenAutenticacao;

    public constructor(params: VerificadorTokenJWTParams){
        this._gerenciadorTokens = params.gerenciadorTokens;
    }

    public async executar(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log("Iniciando a verificacao de token JWT...");
        
        try{
            const bearer = req.headers.authorization as string;
            if(!bearer)
                throw new Error("Token JWT ausente");

            await this._gerenciadorTokens.validarToken(bearer.split(" ")[1]);
            next();
        }catch(e: any){
            const erro = e as Error;
            const mensagem: Mensagem = {
                tipo: "ERRO",
                texto: erro.message
            };

            res.status(401).json(mensagem);
        }
    }
}

export { VerificadorTokenJWT };
