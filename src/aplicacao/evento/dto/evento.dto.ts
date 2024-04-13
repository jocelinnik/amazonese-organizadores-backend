/**
 * 
 * Interface que padroniza os dados da
 * localidade de um evento.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
interface LocalidadeEventoDTO {
    cidade: string;
    uf: string;
}

/**
 * 
 * Interface que padroniza os dados de
 * datas de um evento.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
interface DatasEventoDTO {
    data_inicio: string;
    data_fim: string;
    hora_inicio: string;
    hora_encerramento: string;
}

interface DadosEventoDTO {
    nome: string;
    categorias: Array<string>;
    descricao: string;
    preco: number;
    localidade: LocalidadeEventoDTO;
    datas_evento: DatasEventoDTO;
}

interface NovoEventoDTO extends DadosEventoDTO {
    cpf_cnpj_organizador: string;
}

interface EditarEventoDTO extends DadosEventoDTO {
    id: string;
}

interface EventoDTO extends DadosEventoDTO {
    id: string;
    imagens: Array<string>;
}

interface EventosDTO {
    eventos_ja_finalizados: Array<EventoDTO>;
    eventos_para_iniciar: Array<EventoDTO>;
}

export {
    DadosEventoDTO,
    DatasEventoDTO,
    EditarEventoDTO,
    EventoDTO,
    EventosDTO,
    LocalidadeEventoDTO,
    NovoEventoDTO
};
