import { configDotenv } from "dotenv";

import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { SalvarContatoUsuario } from "@/aplicacao/comum/casos-uso/salvar-contato-usuario.usecase";
import { ManipuladorArquivos } from "@/aplicacao/comum/providers/manipulador-arquivos";
import { ProdutorMensageria } from "@/aplicacao/comum/providers/produtor-mensageria";
import { ContatosUsuariosRepository } from "@/aplicacao/comum/repositorios/contatos-usuarios.repository";
import { AdicionarImagemEvento } from "@/aplicacao/evento/casos-uso/adicionar-imagem-evento.usecase";
import { BuscarEventoPorId } from "@/aplicacao/evento/casos-uso/buscar-evento-por-id.usecase";
import { BuscarEventosPorOrganizador } from "@/aplicacao/evento/casos-uso/buscar-eventos-por-organizador.usecase";
import { CadastrarNovoEvento } from "@/aplicacao/evento/casos-uso/cadastrar-novo-evento.usecase";
import { EditarEvento } from "@/aplicacao/evento/casos-uso/editar-evento.usecase";
import { EditarEventoDTO, EventoDTO } from "@/aplicacao/evento/dto/evento.dto";
import { CadastrarNovoOrganizador } from "@/aplicacao/organizador/casos-uso/cadastrar-novo-organizador.usecase";
import { RealizarLoginOrganizador } from "@/aplicacao/organizador/casos-uso/realizar-login-organizador.usecase";
import { RedefinirSenhaOrganizador } from "@/aplicacao/organizador/casos-uso/redefinir-senha-organizador.usecase";
import { CifradorSegredos } from "@/aplicacao/organizador/providers/cifrador-segredos";
import { GerenciadorTokenAutenticacao } from "@/aplicacao/organizador/providers/gerenciador-tokens-autenticacao";
import { IdentificadorFactory } from "@/dominio/abstracoes/identificadores/identificador.factory";
import { ContatoUsuarioId } from "@/dominio/comum/identificadores/contato-usuario.identificador";
import { Evento } from "@/dominio/evento/agregados/evento.aggregate";
import { EventoId } from "@/dominio/evento/identificadores/evento.identificador";
import { ImagemEventoId } from "@/dominio/evento/identificadores/imagem-evento.identificador";
import { EventosRepository } from "@/dominio/evento/repositorios/eventos.repository";
import { ImagensEventosRepository } from "@/dominio/evento/repositorios/imagens-eventos.repository";
import { CategoriaVO } from "@/dominio/evento/value-objects/categoria.vo";
import { OrganizadoresRepository } from "@/dominio/organizador/repositorios/organizadores.repository";
import { ContainerDI } from "@/infraestrutura/comum/di/container-di";

const configurarObjetosCasosUso = (): void => {
    configDotenv();
    const container = ContainerDI.pegarInstancia();

    // Configurando as instâncias de objetos de caso
    // de uso da aplicação...
    container.set("SalvarContatoUsuario", (cont: ContainerDI): SalvarContatoUsuario => {
        const repository = cont.get<ContatosUsuariosRepository>("ContatosUsuariosRepository");
        const contatoIdFactory = cont.get<IdentificadorFactory<ContatoUsuarioId>>("ContatoUsuarioIdFactory");

        return new SalvarContatoUsuario({ contatoIdFactory, repository });
    });
    container.set("CadastrarNovoOrganizador", (cont: ContainerDI): CadastrarNovoOrganizador => {
        const repository = cont.get<OrganizadoresRepository>("OrganizadoresRepository");
        const cifradorSenha = cont.get<CifradorSegredos>("CifradorSenhas");
        const cifradorFraseSecreta = cont.get<CifradorSegredos>("CifradorFrasesSecretas");

        return new CadastrarNovoOrganizador({ repository, cifradorSenha, cifradorFraseSecreta });
    });
    container.set("RealizarLoginOrganizador", (cont: ContainerDI): RealizarLoginOrganizador => {
        const repository = cont.get<OrganizadoresRepository>("OrganizadoresRepository");
        const cifradorSenha = cont.get<CifradorSegredos>("CifradorSenhas");
        const gerenciadorToken = cont.get<GerenciadorTokenAutenticacao>("GerenciadorTokenAutenticacao");

        return new RealizarLoginOrganizador({ cifradorSenha, gerenciadorToken, repository });
    });
    container.set("RedefinirSenhaOrganizador", (cont: ContainerDI): RedefinirSenhaOrganizador => {
        const cifradorSenha = cont.get<CifradorSegredos>("CifradorSenhas");
        const cifradorFraseSecreta = cont.get<CifradorSegredos>("CifradorFrasesSecretas");
        const repository = cont.get<OrganizadoresRepository>("OrganizadoresRepository");

        return new RedefinirSenhaOrganizador({ cifradorSenha, cifradorFraseSecreta, repository });
    });
    container.set("CadastrarNovoEvento", (cont: ContainerDI): CadastrarNovoEvento => {
        const filaNotificarNovoEvento = process.env.ASB_FILA_NOTIFICAR_NOVO_EVENTO as string;
        const eventosRepository = cont.get<EventosRepository>("EventosRepository");
        const eventoIdFactory = cont.get<IdentificadorFactory<EventoId>>("EventoIdFactory");
        const categoriaEventoMapper = cont.get<ObjectMapper<string, CategoriaVO>>("CategoriaVOMapper");
        const eventoDTOMapper = cont.get<ObjectMapper<Evento, EventoDTO>>("EventoDTOMapper");
        const produtorMensageria = cont.get<ProdutorMensageria>("ProdutorMensageria");

        return new CadastrarNovoEvento({
            categoriaEventoMapper,
            eventoIdFactory,
            eventosRepository,
            eventoDTOMapper,
            produtorMensageria,
            filaNotificarNovoEvento
        });
    });
    container.set("BuscarEventosPorOrganizador", (cont: ContainerDI): BuscarEventosPorOrganizador => {
        const repository = cont.get<EventosRepository>("EventosRepository");
        const mapper = cont.get<ObjectMapper<Evento, EventoDTO>>("EventoDTOMapper");

        return new BuscarEventosPorOrganizador({ repository: repository, mapper: mapper });
    });
    container.set("BuscarEventoPorId", (cont: ContainerDI): BuscarEventoPorId => {
        const repository = cont.get<EventosRepository>("EventosRepository");
        const eventoDTOMapper = cont.get<ObjectMapper<Evento, EventoDTO>>("EventoDTOMapper");

        return new BuscarEventoPorId({ repository, eventoDTOMapper });
    });
    container.set("EditarEvento", (cont: ContainerDI): EditarEvento => {
        const eventosRepository = cont.get<EventosRepository>("EventosRepository");
        const eventoMapper = cont.get<ObjectMapper<EditarEventoDTO, Evento>>("EditarEventoMapper");

        return new EditarEvento({ eventoMapper, eventosRepository });
    });
    container.set("AdicionarImagemEvento", (cont: ContainerDI): AdicionarImagemEvento => {
        const eventosRepository = cont.get<EventosRepository>("EventosRepository");
        const imagensEventosRepository = cont.get<ImagensEventosRepository>("ImagensEventosRepository");
        const manipuladorArquivos = cont.get<ManipuladorArquivos>("ManipuladorImagensEventos");
        const imagemEventoIdFactory = cont.get<IdentificadorFactory<ImagemEventoId>>("ImagemEventoIdFactory");

        return new AdicionarImagemEvento({
            eventosRepository,
            imagemEventoIdFactory,
            imagensEventosRepository,
            manipuladorArquivos
        });
    });
};

export { configurarObjetosCasosUso };
