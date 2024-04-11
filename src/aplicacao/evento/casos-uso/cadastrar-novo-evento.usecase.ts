import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { NovoEventoDTO } from "@/aplicacao/evento/dto/evento.dto";
import { BaseModelException } from "@/dominio/abstracoes/excecoes/model.exception";
import { IdentificadorFactory } from "@/dominio/abstracoes/identificadores/identificador.factory";
import { Evento } from "@/dominio/evento/agregados/evento.aggregate";
import { EventoId } from "@/dominio/evento/identificadores/evento.identificador";
import { EventosRepository } from "@/dominio/evento/repositorios/eventos.repository";
import { CategoriaVO } from "@/dominio/evento/value-objects/categoria.vo";
import { CpfCnpjOrganizador } from "@/dominio/organizador/identificadores/organizador.identificador";
import { OrganizadoresRepository } from "@/dominio/organizador/repositorios/organizadores.repository";

type CadastrarNovoEventoParams = {
    categoriaEventoMapper: ObjectMapper<string, CategoriaVO>;
    eventoIdFactory: IdentificadorFactory<EventoId>;
    eventosRepository: EventosRepository;
    organizadoresRepository: OrganizadoresRepository;
};

class CadastrarNovoEvento {

    private readonly _categoriaEventoMapper: ObjectMapper<string, CategoriaVO>;

    private readonly _eventoIdFactory: IdentificadorFactory<EventoId>;

    private readonly _eventosRepository: EventosRepository;

    private readonly _organizadoresRepository: OrganizadoresRepository;

    public constructor(params: CadastrarNovoEventoParams){
        this._categoriaEventoMapper = params.categoriaEventoMapper;
        this._eventoIdFactory = params.eventoIdFactory;
        this._eventosRepository = params.eventosRepository;
        this._organizadoresRepository = params.organizadoresRepository;
    }

    public async executar(input: NovoEventoDTO): Promise<void> {
        try{
            const cpfOuCnpjOrganizador = CpfCnpjOrganizador.instanciar(input.cpf_cnpj_organizador);
            const organizador = await this._organizadoresRepository.buscarPorCpfCnpj(cpfOuCnpjOrganizador);
            const novoEvento = await this.instanciarEvento(input);
            novoEvento.adicionarOrganizador(organizador);
    
            await this._eventosRepository.salvar(novoEvento);
        }catch(e: any){
            const erro = e as BaseModelException;

            throw new Error(erro.causa.message);
        }
    }

    private async instanciarEvento(input: NovoEventoDTO): Promise<Evento> {
        const idEvento = await this._eventoIdFactory.gerarNovoId();
        const categorias = this._categoriaEventoMapper.mapearListaOrigemParaListaDestino(input.categorias);

        const novoEvento = Evento.instanciar({
            id: idEvento,
            nome: input.nome,
            descricao: input.descricao,
            preco: input.preco,
            localidade: {
                cidade: input.localidade.cidade,
                uf: input.localidade.uf
            },
            datasEvento: {
                dataInicio: input.datas_evento.data_inicio,
                dataFim: input.datas_evento.data_fim
            }
        });

        for(let categoria of categorias)
            novoEvento.adicionarCategoria(categoria);

        return novoEvento;
    }
}

export { CadastrarNovoEvento };
