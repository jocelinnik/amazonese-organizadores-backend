import multer from "multer";
import { Router } from "express";

import { ContainerDI } from "@/infraestrutura/comum/di/container-di";
import { VerificadorTokenJWT } from "@/infraestrutura/comum/express/middlewares/verificador-token-jwt.middleware";
import { AdicionarImagemEventoController } from "@/infraestrutura/evento/express/controllers/adicionar-imagem-evento.controller";
import { BuscarEventoPorIdController } from "@/infraestrutura/evento/express/controllers/buscar-evento-por-id.controller";
import { BuscarEventosPorOrganizadorController } from "@/infraestrutura/evento/express/controllers/buscar-eventos-por-organizador.controller";
import { CadastrarNovoEventoController } from "@/infraestrutura/evento/express/controllers/cadastrar-novo-evento.controller";
import { EditarEventoController } from "@/infraestrutura/evento/express/controllers/editar-evento.controller";
import { FormatadorArquivos } from "@/infraestrutura/comum/express/middlewares/formatador-arquivos.middleware";

const eventosRoutes = (): Router => {
    const routes = Router();
    const uploadMulter = multer();
    const container = ContainerDI.pegarInstancia();
    const adicionarImagemEvento = container.get<AdicionarImagemEventoController>("AdicionarImagemEventoController");
    const buscarEventoPorId = container.get<BuscarEventoPorIdController>("BuscarEventoPorIdController");
    const buscarEventosPorOrganizador = container.get<BuscarEventosPorOrganizadorController>("BuscarEventosPorOrganizadorController");
    const cadastrarNovoEvento = container.get<CadastrarNovoEventoController>("CadastrarNovoEventoController");
    const editarEvento = container.get<EditarEventoController>("EditarEventoController");
    const verificadorTokenJWT = container.get<VerificadorTokenJWT>("VerificadorTokenJWT");
    const formatadorArquivos = container.get<FormatadorArquivos>("FormatadorArquivos");

    routes.get(
        "/organizador/:cpf_cnpj_organizador", 
        [verificadorTokenJWT.executar.bind(verificadorTokenJWT)], 
        buscarEventosPorOrganizador.executar.bind(buscarEventosPorOrganizador)
    );
    routes.get(
        "/:id_evento", 
        [verificadorTokenJWT.executar.bind(verificadorTokenJWT)], 
        buscarEventoPorId.executar.bind(buscarEventoPorId)
    );
    routes.post(
        "", 
        [verificadorTokenJWT.executar.bind(verificadorTokenJWT)], 
        cadastrarNovoEvento.executar.bind(cadastrarNovoEvento)
    );
    routes.post(
        "/adicionar-imagem", 
        [
            verificadorTokenJWT.executar.bind(verificadorTokenJWT),
            uploadMulter.single("imagem"),
            formatadorArquivos.executar.bind(formatadorArquivos)
        ],
        adicionarImagemEvento.executar.bind(adicionarImagemEvento)
    );
    routes.patch(
        "", 
        [verificadorTokenJWT.executar.bind(verificadorTokenJWT)], 
        editarEvento.executar.bind(editarEvento)
    );

    return routes;
};

export { eventosRoutes };   
