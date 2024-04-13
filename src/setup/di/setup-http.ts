import { SalvarContatoUsuario } from "@/aplicacao/comum/casos-uso/salvar-contato-usuario.usecase";
import { AdicionarImagemEvento } from "@/aplicacao/evento/casos-uso/adicionar-imagem-evento.usecase";
import { BuscarEventoPorId } from "@/aplicacao/evento/casos-uso/buscar-evento-por-id.usecase";
import { BuscarEventosPorOrganizador } from "@/aplicacao/evento/casos-uso/buscar-eventos-por-organizador.usecase";
import { CadastrarNovoEvento } from "@/aplicacao/evento/casos-uso/cadastrar-novo-evento.usecase";
import { EditarEvento } from "@/aplicacao/evento/casos-uso/editar-evento.usecase";
import { CadastrarNovoOrganizador } from "@/aplicacao/organizador/casos-uso/cadastrar-novo-organizador.usecase";
import { RealizarLoginOrganizador } from "@/aplicacao/organizador/casos-uso/realizar-login-organizador.usecase";
import { RedefinirSenhaOrganizador } from "@/aplicacao/organizador/casos-uso/redefinir-senha-organizador.usecase";
import { GerenciadorTokenAutenticacao } from "@/aplicacao/organizador/providers/gerenciador-tokens-autenticacao";
import { ContainerDI } from "@/infraestrutura/comum/di/container-di";
import { HomeController } from "@/infraestrutura/comum/express/controllers/home.controller";
import { SalvarContatoUsuarioController } from "@/infraestrutura/comum/express/controllers/salvar-contato-usuario.controller";
import { FormatadorArquivos } from "@/infraestrutura/comum/express/middlewares/formatador-arquivos.middleware";
import { VerificadorTokenJWT } from "@/infraestrutura/comum/express/middlewares/verificador-token-jwt.middleware";
import { AdicionarImagemEventoController } from "@/infraestrutura/evento/express/controllers/adicionar-imagem-evento.controller";
import { BuscarEventoPorIdController } from "@/infraestrutura/evento/express/controllers/buscar-evento-por-id.controller";
import { BuscarEventosPorOrganizadorController } from "@/infraestrutura/evento/express/controllers/buscar-eventos-por-organizador.controller";
import { CadastrarNovoEventoController } from "@/infraestrutura/evento/express/controllers/cadastrar-novo-evento.controller";
import { EditarEventoController } from "@/infraestrutura/evento/express/controllers/editar-evento.controller";
import { CadastrarNovoOrganizadorController } from "@/infraestrutura/organizador/express/controllers/cadastrar-novo-organizador.controller";
import { RealizarLoginOrganizadorController } from "@/infraestrutura/organizador/express/controllers/realizar-login-organizador.controller";
import { RedefinirSenhaOrganizadorController } from "@/infraestrutura/organizador/express/controllers/redefinir-senha-organizador.controller";

const configurarObjetosHTTP = (): void => {
    const container = ContainerDI.pegarInstancia();

    // Configurando as instâncias de objetos middleware
    // HTTP da aplicação...
    container.set("VerificadorTokenJWT", (cont: ContainerDI): VerificadorTokenJWT => {
        const gerenciadorTokens = cont.get<GerenciadorTokenAutenticacao>("GerenciadorTokenAutenticacao");

        return new VerificadorTokenJWT({ gerenciadorTokens });
    });
    container.set("FormatadorArquivos", (): FormatadorArquivos => {
        return new FormatadorArquivos();
    });

    // Configurando as instâncias de objetos controllers
    // HTTP da aplicação...
    container.set("HomeController", (): HomeController => {
        return new HomeController();
    });
    container.set("SalvarContatoUsuarioController", (cont: ContainerDI): SalvarContatoUsuarioController => {
        const useCase = cont.get<SalvarContatoUsuario>("SalvarContatoUsuario");

        return new SalvarContatoUsuarioController({ useCase });
    });
    container.set("CadastrarNovoOrganizadorController", (cont: ContainerDI): CadastrarNovoOrganizadorController => {
        const useCase = cont.get<CadastrarNovoOrganizador>("CadastrarNovoOrganizador");

        return new CadastrarNovoOrganizadorController({ useCase });
    });
    container.set("RealizarLoginOrganizadorController", (cont: ContainerDI): RealizarLoginOrganizadorController => {
        const useCase = cont.get<RealizarLoginOrganizador>("RealizarLoginOrganizador");

        return new RealizarLoginOrganizadorController({ useCase });
    });
    container.set("RedefinirSenhaOrganizadorController", (cont: ContainerDI): RedefinirSenhaOrganizadorController => {
        const useCase = cont.get<RedefinirSenhaOrganizador>("RedefinirSenhaOrganizador");

        return new RedefinirSenhaOrganizadorController({ useCase });
    });
    container.set("CadastrarNovoEventoController", (cont: ContainerDI): CadastrarNovoEventoController => {
        const useCase = cont.get<CadastrarNovoEvento>("CadastrarNovoEvento");

        return new CadastrarNovoEventoController({ useCase });
    });
    container.set("BuscarEventosPorOrganizadorController", (cont: ContainerDI): BuscarEventosPorOrganizadorController => {
        const useCase = cont.get<BuscarEventosPorOrganizador>("BuscarEventosPorOrganizador");

        return new BuscarEventosPorOrganizadorController({ useCase });
    });
    container.set("BuscarEventoPorIdController", (cont: ContainerDI): BuscarEventoPorIdController => {
        const useCase = cont.get<BuscarEventoPorId>("BuscarEventoPorId");

        return new BuscarEventoPorIdController({ useCase });
    });
    container.set("EditarEventoController", (cont: ContainerDI): EditarEventoController => {
        const useCase = cont.get<EditarEvento>("EditarEvento");

        return new EditarEventoController({ useCase });
    });
    container.set("AdicionarImagemEventoController", (cont: ContainerDI): AdicionarImagemEventoController => {
        const useCase = cont.get<AdicionarImagemEvento>("AdicionarImagemEvento");

        return new AdicionarImagemEventoController({ useCase });
    });
};

export { configurarObjetosHTTP };
