import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { CpfCnpjOrganizador } from "@/dominio/organizador/identificadores/organizador.identificador";
import { Organizador } from "@/dominio/organizador/modelos/organizador.model";
import { PrismaOrganizadorEntity } from "@/infraestrutura/organizador/prisma/entidades/prisma-organizador.entity";

class HidratarOrganizadorMapper extends ObjectMapper<PrismaOrganizadorEntity, Organizador> {

    public constructor(){
        super();
    }

    public mapear(prismaOrganizador: PrismaOrganizadorEntity): Organizador {
        return Organizador.instanciar({
            cpfOuCnpj: CpfCnpjOrganizador.instanciar(prismaOrganizador.cpfCnpj),
            nome: prismaOrganizador.nome,
            email: prismaOrganizador.email,
            telefone: prismaOrganizador.telefone,
            senha: prismaOrganizador.senha,
            fraseSecreta: prismaOrganizador.fraseSecreta
        });
    }
}

export { HidratarOrganizadorMapper };
