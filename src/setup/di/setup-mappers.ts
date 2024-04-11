import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import {
    DatasEventoDTO,
    EditarEventoDTO,
    EventoDTO,
    LocalidadeEventoDTO
} from "@/aplicacao/evento/dto/evento.dto";
import { CategoriaDTOMapper } from "@/aplicacao/evento/mapper/categoria-dto.mapper";
import { CategoriaVOMapper } from "@/aplicacao/evento/mapper/categoria-vo.mapper";
import { DatasEventoDTOMapper } from "@/aplicacao/evento/mapper/datas-evento-dto.mapper";
import { EditarEventoMapper } from "@/aplicacao/evento/mapper/editar-evento-dto.mapper";
import { EventoDTOMapper } from "@/aplicacao/evento/mapper/evento-dto.mapper";
import { ImagemEventoMapper } from "@/aplicacao/evento/mapper/imagem-evento.mapper";
import { LocalidadeEventoDTOMapper } from "@/aplicacao/evento/mapper/localidade-dto.mapper";
import { Evento } from "@/dominio/evento/agregados/evento.aggregate";
import { ImagemEvento } from "@/dominio/evento/agregados/imagem-evento.aggregate";
import { CategoriaVO } from "@/dominio/evento/value-objects/categoria.vo";
import { DatasEventoVO } from "@/dominio/evento/value-objects/datas-evento.vo";
import { LocalidadeVO } from "@/dominio/evento/value-objects/localidade.vo";
import { Organizador } from "@/dominio/organizador/modelos/organizador.model";
import { ContainerDI } from "@/infraestrutura/comum/di/container-di";
import { PrismaEventoEntity } from "@/infraestrutura/evento/prisma/entidades/prisma-evento.entity";
import { PrismaImagemEventoEntity } from "@/infraestrutura/evento/prisma/entidades/prisma-imagem-evento.entity";
import { HidratarEventoMapper } from "@/infraestrutura/evento/prisma/mappers/hidratar-evento.mapper";
import { HidratarImagemEventoMapper } from "@/infraestrutura/evento/prisma/mappers/hidratar-imagem-evento.mapper";
import { PrismaOrganizadorEntity } from "@/infraestrutura/organizador/prisma/entidades/prisma-organizador.entity";
import { HidratarOrganizadorMapper } from "@/infraestrutura/organizador/prisma/mappers/hidratar-organizador.mapper";

const configurarObjectMappers = (): void => {
    const container = ContainerDI.pegarInstancia();

    // Configurando os mapeadores de objetos da camada 
    // de aplicação...
    container.set("CategoriaDTOMapper", (): ObjectMapper<CategoriaVO, string> => {
        return new CategoriaDTOMapper();
    });
    container.set("CategoriaVOMapper", (): ObjectMapper<string, CategoriaVO> => {
        return new CategoriaVOMapper();
    });
    container.set("DatasEventoDTOMapper", (): ObjectMapper<DatasEventoVO, DatasEventoDTO> => {
        return new DatasEventoDTOMapper();
    });
    container.set("EditarEventoMapper", (cont: ContainerDI): ObjectMapper<EditarEventoDTO, Evento> => {
        const categoriaEventoMapper = cont.get<CategoriaVOMapper>("CategoriaVOMapper");

        return new EditarEventoMapper({ categoriaEventoMapper });
    });
    container.set("EventoDTOMapper", (cont: ContainerDI): ObjectMapper<Evento, EventoDTO> => {
        const categoriaDTOMapper = cont.get<ObjectMapper<CategoriaVO, string>>("CategoriaDTOMapper");
        const imagemEventoMapper = cont.get<ObjectMapper<ImagemEvento, string>>("ImagemEventoMapper");
        const datasEventoDTOMapper = cont.get<ObjectMapper<DatasEventoVO, DatasEventoDTO>>("DatasEventoDTOMapper");
        const localidadeDTOMapper = cont.get<ObjectMapper<LocalidadeVO, LocalidadeEventoDTO>>("LocalidadeEventoDTOMapper");

        return new EventoDTOMapper({
            categoriaDTOMapper,
            imagemEventoMapper,
            datasEventoDTOMapper,
            localidadeDTOMapper
        });
    });
    container.set("ImagemEventoMapper", (): ObjectMapper<ImagemEvento, string> => {
        return new ImagemEventoMapper();
    });
    container.set("LocalidadeEventoDTOMapper", (): ObjectMapper<LocalidadeVO, LocalidadeEventoDTO> => {
        return new LocalidadeEventoDTOMapper();
    });

    // Configurando os mapeadores de objetos da camada 
    // de infraestrutura/frameworks...
    container.set("HidratarOrganizadorMapper", (): ObjectMapper<PrismaOrganizadorEntity, Organizador> => {
        return new HidratarOrganizadorMapper();
    });
    container.set("HidratarImagemEventoMapper", (): ObjectMapper<PrismaImagemEventoEntity, ImagemEvento> => {
        return new HidratarImagemEventoMapper();
    });
    container.set("HidratarEventoMapper", (cont: ContainerDI): ObjectMapper<PrismaEventoEntity, Evento> => {
        const categoriaVOMapper = cont.get<ObjectMapper<string, CategoriaVO>>("CategoriaVOMapper");
        const imagemEventoMapper = cont.get<ObjectMapper<PrismaImagemEventoEntity, ImagemEvento>>("HidratarImagemEventoMapper");
        const organizadorMapper = cont.get<ObjectMapper<PrismaOrganizadorEntity, Organizador>>("HidratarOrganizadorMapper");

        return new HidratarEventoMapper({
            categoriaVOMapper,
            imagemEventoMapper,
            organizadorMapper
        });
    });
};

export { configurarObjectMappers };
