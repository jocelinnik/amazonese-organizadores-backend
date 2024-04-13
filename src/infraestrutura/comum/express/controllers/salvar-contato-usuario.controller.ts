import { Request, Response } from "express";

import { SalvarContatoUsuario } from "@/aplicacao/comum/casos-uso/salvar-contato-usuario.usecase";
import { NovoContatoUsuarioDTO } from "@/aplicacao/comum/dto/contato-usuario.dto";
import { Mensagem } from "@/aplicacao/comum/dto/mensagem.dto";
import { BaseModelException } from "@/dominio/abstracoes/excecoes/model.exception";

type SalvarContatoUsuarioControllerParams = {
    useCase: SalvarContatoUsuario;
};

class SalvarContatoUsuarioController {

    private readonly _useCase: SalvarContatoUsuario;

    public constructor(params: SalvarContatoUsuarioControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        let status = 201;
        const mensagem: Mensagem = {
            tipo: "SUCESSO",
            texto: "Seu contato foi salvo com sucesso. Entraremos em contato com você em breve."
        };

        try{
            const novoContato = req.body as NovoContatoUsuarioDTO;
            await this._useCase.executar(novoContato);
        }catch(e: any){
            console.error(e);

            if(e instanceof BaseModelException){
                status = 400;
                mensagem.texto = e.causa.message;
            }else{
                status = 500;
                mensagem.texto = "Houve um problema na aplicação. Tente novamente mais tarde.";
            }
        }

        res.status(status).json(mensagem);
    }
}

export { SalvarContatoUsuarioController };
