import { PrismaClient } from "@prisma/client";

import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { Evento } from "@/dominio/evento/agregados/evento.aggregate";
import { EventosRepository } from "@/dominio/evento/repositorios/eventos.repository";
import { ImagensEventosRepository } from "@/dominio/evento/repositorios/imagens-eventos.repository";
import { Organizador } from "@/dominio/organizador/modelos/organizador.model";
import { OrganizadoresRepository } from "@/dominio/organizador/repositorios/organizadores.repository";
import { ContainerDI } from "@/infraestrutura/comum/di/container-di";
import { PrismaEventoEntity } from "@/infraestrutura/evento/prisma/entidades/prisma-evento.entity";
import { PrismaEventosRepository } from "@/infraestrutura/evento/prisma/repositorios/prisma-eventos.repository";
import { PrismaImagensEventosRepository } from "@/infraestrutura/evento/prisma/repositorios/prisma-imagens-eventos.repository";
import { PrismaOrganizadorEntity } from "@/infraestrutura/organizador/prisma/entidades/prisma-organizador.entity";
import { PrismaOrganizadoresRepository } from "@/infraestrutura/organizador/prisma/repositorios/prisma-organizadores.repository";

const configurarObjetosBD = (): void => {
    const container = ContainerDI.pegarInstancia();

    // Configurando a geração de conexões de banco de
    // dados do Prisma...
    container.set("PrismaClient", (): PrismaClient => {
        return new PrismaClient({
            log: ["info", "query"]
        });
    });

    // Configurando instâncias de repositório de dados
    // da aplicação...
    container.set("EventosRepository", (cont: ContainerDI): EventosRepository => {
        const conexao = cont.get<PrismaClient>("PrismaClient");
        const eventoMapper = cont.get<ObjectMapper<PrismaEventoEntity, Evento>>("HidratarEventoMapper");

        return new PrismaEventosRepository({ conexao, eventoMapper });
    });
    container.set("ImagensEventosRepository", (cont: ContainerDI): ImagensEventosRepository => {
        const conexao = cont.get<PrismaClient>("PrismaClient");

        return new PrismaImagensEventosRepository({ conexao });
    });
    container.set("OrganizadoresRepository", (cont: ContainerDI): OrganizadoresRepository => {
        const conexao = cont.get<PrismaClient>("PrismaClient");
        const organizadorMapper = cont.get<ObjectMapper<PrismaOrganizadorEntity, Organizador>>("HidratarOrganizadorMapper");

        return new PrismaOrganizadoresRepository({ conexao, organizadorMapper });
    });
};

export { configurarObjetosBD };
