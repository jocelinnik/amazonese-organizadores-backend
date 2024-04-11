import { Router } from "express";

import { ContainerDI } from "@/infraestrutura/comum/di/container-di";
import { CadastrarNovoOrganizadorController } from "@/infraestrutura/organizador/express/controllers/cadastrar-novo-organizador.controller";
import { RealizarLoginOrganizadorController } from "@/infraestrutura/organizador/express/controllers/realizar-login-organizador.controller";
import { RedefinirSenhaOrganizadorController } from "@/infraestrutura/organizador/express/controllers/redefinir-senha-organizador.controller";

const organizadoresRoutes = (): Router => {
    const routes = Router();
    const container = ContainerDI.pegarInstancia();
    const cadastrarNovoOrganizador = container.get<CadastrarNovoOrganizadorController>("CadastrarNovoOrganizadorController");
    const realizarLoginOrganizador = container.get<RealizarLoginOrganizadorController>("RealizarLoginOrganizadorController");
    const redefinirSenhaOrganizador = container.get<RedefinirSenhaOrganizadorController>("RedefinirSenhaOrganizadorController");

    routes.post("/", cadastrarNovoOrganizador.executar.bind(cadastrarNovoOrganizador));
    routes.post("/login", realizarLoginOrganizador.executar.bind(realizarLoginOrganizador));
    routes.post("/redefinir-senha", redefinirSenhaOrganizador.executar.bind(redefinirSenhaOrganizador));

    return routes;
};

export { organizadoresRoutes };
