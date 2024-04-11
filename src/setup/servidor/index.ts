import cors from "cors";
import express from "express";

import { createServer, Server } from "node:http";
import { join } from "node:path";

import { configurarDependencias } from "@/setup/di";
import { configurarRotas } from "@/setup/express-routes";

const configurarServidor = (): Server => {
    configurarDependencias();

    const app = express();
    const servidor = createServer(app);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(join(process.cwd(), "/public")));
    app.use(cors({
        origin: "*"
    }));
    app.use("/api", configurarRotas());

    return servidor;
};

export { configurarServidor };
