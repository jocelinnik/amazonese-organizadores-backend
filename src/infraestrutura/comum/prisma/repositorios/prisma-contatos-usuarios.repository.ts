import { PrismaClient } from "@prisma/client";

import { ContatosUsuariosRepository } from "@/aplicacao/comum/repositorios/contatos-usuarios.repository";
import { ContatoUsuario } from "@/dominio/comum/modelos/contato-usuario.model";

type PrismaContatosUsuariosRepositoryParams = {
    conexao: PrismaClient;
};

class PrismaContatosUsuariosRepository implements ContatosUsuariosRepository {

    private readonly _conexao: PrismaClient;

    public constructor(params: PrismaContatosUsuariosRepositoryParams){
        this._conexao = params.conexao;
    }

    public async salvar(contato: ContatoUsuario): Promise<void> {
        await this._conexao.contatoUsuario.upsert({
            create: {
                id: contato.id.valor,
                nomeUsuario: contato.nome.valor,
                email: contato.email.valor,
                telefone: contato.telefone.valor,
                tipoUsuario: contato.tipoUsuario.toString(),
                tipoContato: contato.tipoContato.toString(),
                texto: contato.texto.valor,
                dataContato: contato.dataContato.valor
            },
            update: {
                nomeUsuario: contato.nome.valor,
                email: contato.email.valor,
                telefone: contato.telefone.valor,
                tipoUsuario: contato.tipoUsuario.toString(),
                tipoContato: contato.tipoContato.toString(),
                texto: contato.texto.valor,
                dataContato: contato.dataContato.valor
            },
            where: {
                id: contato.id.valor
            }
        });
    }
}

export { PrismaContatosUsuariosRepository };
