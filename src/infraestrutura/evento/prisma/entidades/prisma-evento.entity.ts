import { Evento } from "@prisma/client";

import { PrismaOrganizadorEntity } from "@/infraestrutura/organizador/prisma/entidades/prisma-organizador.entity";
import { PrismaImagemEventoEntity } from "./prisma-imagem-evento.entity";

type PrismaEventoEntity = Evento & {
    organizador?: PrismaOrganizadorEntity;
    imagens?: Array<PrismaImagemEventoEntity>;
};

export { PrismaEventoEntity };
