import { PrismaClient } from "@prisma/client";

import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { CpfCnpjOrganizador } from "@/dominio/organizador/identificadores/organizador.identificador";
import { Organizador } from "@/dominio/organizador/modelos/organizador.model";
import { OrganizadoresRepository } from "@/dominio/organizador/repositorios/organizadores.repository";
import { PrismaOrganizadorEntity } from "@/infraestrutura/organizador/prisma/entidades/prisma-organizador.entity";

type NewPrismaOrganizadoresRepositoryParams = {
    conexao: PrismaClient;
    organizadorMapper: ObjectMapper<PrismaOrganizadorEntity, Organizador>;
};

class PrismaOrganizadoresRepository implements OrganizadoresRepository {

    private readonly _conexao: PrismaClient;

    private readonly _organizadorMapper: ObjectMapper<PrismaOrganizadorEntity, Organizador>;

    public constructor(params: NewPrismaOrganizadoresRepositoryParams){
        this._conexao = params.conexao;
        this._organizadorMapper = params.organizadorMapper;
    }

    public async buscarPorCpfCnpj(cpfOUcnpj: CpfCnpjOrganizador): Promise<Organizador> {
        const dadosOrganizador = await this._conexao.organizador.findFirst({
            where: {
                cpfCnpj: cpfOUcnpj.valor
            }
        });

        if(!dadosOrganizador)
            throw new Error(`O organizador com CPF/CNPJ ${cpfOUcnpj.valor} não foi encontrado`);

        return this._organizadorMapper.mapearOrigemParaDestino(dadosOrganizador);
    }

    public async salvar(organizador: Organizador): Promise<void> {
        await this._conexao.organizador.upsert({
            create: {
                cpfCnpj: organizador.cpfOuCnpj.valor,
                nome: organizador.nome.valor,
                email: organizador.email.valor,
                telefone: organizador.telefone.valor,
                senha: organizador.senha.valor,
                fraseSecreta: organizador.fraseSecreta.valor
            },
            update: {
                nome: organizador.nome.valor,
                email: organizador.email.valor,
                telefone: organizador.telefone.valor,
                senha: organizador.senha.valor,
                fraseSecreta: organizador.fraseSecreta.valor
            },
            where: {
                cpfCnpj: organizador.cpfOuCnpj.valor
            }
        });
    }
}

export { PrismaOrganizadoresRepository };
