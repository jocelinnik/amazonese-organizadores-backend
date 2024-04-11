import { Router } from "express";

import { homeRoutes } from "@/infraestrutura/comum/express/routes";
import { organizadoresRoutes } from "@/infraestrutura/organizador/express/routes";
import { eventosRoutes } from "@/infraestrutura/evento/express/routes";

const configurarRotas = (): Router => {
    console.log("Iniciando a configuracao de rotas HTTP da aplicacao...");

    const routes = Router();

    routes.use("/", homeRoutes());
    routes.use("/eventos", eventosRoutes());
    routes.use("/organizadores", organizadoresRoutes());

    return routes;
};

export { configurarRotas }
