import { Router } from "express";

import { ContainerDI } from "@/infraestrutura/comum/di/container-di";
import { HomeController } from "@/infraestrutura/comum/express/controllers/home.controller";
import { SalvarContatoUsuarioController } from "@/infraestrutura/comum/express/controllers/salvar-contato-usuario.controller";

const homeRoutes = (): Router => {
    const routes = Router();
    const container = ContainerDI.pegarInstancia();
    const home = container.get<HomeController>("HomeController");
    const salvarContatoUsuario = container.get<SalvarContatoUsuarioController>("SalvarContatoUsuarioController");

    routes.get("/", home.executar.bind(home));
    routes.post("/contato", salvarContatoUsuario.executar.bind(salvarContatoUsuario));

    return routes;
};

export { homeRoutes };
