import { ObjectMapper } from "@/aplicacao/abstracoes/mapper/base.mapper";
import { ProdutorMensageria } from "@/aplicacao/comum/providers/produtor-mensageria";
import { DadosEventoDTO, NovoEventoDTO } from "@/aplicacao/evento/dto/evento.dto";
import { BaseModelException } from "@/dominio/abstracoes/excecoes/model.exception";
import { IdentificadorFactory } from "@/dominio/abstracoes/identificadores/identificador.factory";
import { Evento } from "@/dominio/evento/agregados/evento.aggregate";
import { EventoId } from "@/dominio/evento/identificadores/evento.identificador";
import { EventosRepository } from "@/dominio/evento/repositorios/eventos.repository";
import { CategoriaVO } from "@/dominio/evento/value-objects/categoria.vo";
import { Organizador } from "@/dominio/organizador/modelos/organizador.model";

type CadastrarNovoEventoParams = {
    categoriaEventoMapper: ObjectMapper<string, CategoriaVO>;
    eventoIdFactory: IdentificadorFactory<EventoId>;
    eventosRepository: EventosRepository;
    eventoDTOMapper: ObjectMapper<Evento, DadosEventoDTO>;
    produtorMensageria: ProdutorMensageria;
    filaNotificarNovoEvento: string;
};
type CadastrarNovoEventoInput = {
    dadosNovoEvento: NovoEventoDTO;
    organizador: Organizador;
};

class CadastrarNovoEvento {

    private readonly _categoriaEventoMapper: ObjectMapper<string, CategoriaVO>;

    private readonly _eventoIdFactory: IdentificadorFactory<EventoId>;

    private readonly _eventosRepository: EventosRepository;

    private readonly _eventoDTOMapper: ObjectMapper<Evento, DadosEventoDTO>;

    private readonly _produtorMensageria: ProdutorMensageria;

    private readonly _filaNotificarNovoEvento: string;

    public constructor(params: CadastrarNovoEventoParams){
        this._categoriaEventoMapper = params.categoriaEventoMapper;
        this._eventoIdFactory = params.eventoIdFactory;
        this._eventosRepository = params.eventosRepository;
        this._eventoDTOMapper = params.eventoDTOMapper;
        this._produtorMensageria = params.produtorMensageria;
        this._filaNotificarNovoEvento = params.filaNotificarNovoEvento;
    }

    public async executar(input: CadastrarNovoEventoInput): Promise<DadosEventoDTO> {
        try{
            const { dadosNovoEvento, organizador } = input;
            const novoEvento = await this.instanciarEvento(dadosNovoEvento);
            novoEvento.adicionarOrganizador(organizador);
            await this._eventosRepository.salvar(novoEvento);
            await this._produtorMensageria.publicarMensagem(
                this._filaNotificarNovoEvento, 
                novoEvento.id.valor
            );

            return this._eventoDTOMapper.mapear(novoEvento);
        }catch(e: any){
            console.error(e);
            const erro = e as BaseModelException;

            throw new Error(erro.causa.message);
        }
    }

    private async instanciarEvento(input: NovoEventoDTO): Promise<Evento> {
        const idEvento = await this._eventoIdFactory.gerarNovoId();
        const categorias = this._categoriaEventoMapper.mapearLista(input.categorias);

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
                dataFim: input.datas_evento.data_fim,
                horaInicio: input.datas_evento.hora_inicio,
                horaEncerramento: input.datas_evento.hora_encerramento
            }
        });

        for(let categoria of categorias)
            novoEvento.adicionarCategoria(categoria);

        return novoEvento;
    }
}

export { CadastrarNovoEvento };
