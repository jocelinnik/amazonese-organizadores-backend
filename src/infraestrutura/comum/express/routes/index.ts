import { Request, Response, Router } from "express";

const homeRoutes = (): Router => {
    const routes = Router();

    routes.get("/", async (_: Request, res: Response): Promise<void> => {
        res.json({
            nome_app: "amazonese-organizadores-backend",
            data_versao: "2024-03-27",
            id_versao: "0.0.1-dev"
        });
    });

    return routes;
};

export { homeRoutes };
