import { ManipuladorArquivos } from "@/aplicacao/comum/providers/manipulador-arquivos";
import { ImagemEventoDTO } from "@/aplicacao/evento/dto/imagem-evento.dto";
import { IdentificadorFactory } from "@/dominio/abstracoes/identificadores/identificador.factory";
import { ImagemEvento } from "@/dominio/evento/agregados/imagem-evento.aggregate";
import { EventoId } from "@/dominio/evento/identificadores/evento.identificador";
import { ImagemEventoId } from "@/dominio/evento/identificadores/imagem-evento.identificador";
import { EventosRepository } from "@/dominio/evento/repositorios/eventos.repository";
import { ImagensEventosRepository } from "@/dominio/evento/repositorios/imagens-eventos.repository";

type AdicionarImagemEventoParams = {
    eventosRepository: EventosRepository;
    imagensEventosRepository: ImagensEventosRepository;
    manipuladorArquivos: ManipuladorArquivos;
    imagemEventoIdFactory: IdentificadorFactory<ImagemEventoId>;
};

class AdicionarImagemEvento {

    private readonly _eventosRepository: EventosRepository;

    private readonly _imagensEventosRepository: ImagensEventosRepository;

    private readonly _manipuladorArquivos: ManipuladorArquivos;

    private readonly _imagemEventoIdFactory: IdentificadorFactory<ImagemEventoId>;

    public constructor(params: AdicionarImagemEventoParams){
        this._eventosRepository = params.eventosRepository;
        this._imagensEventosRepository = params.imagensEventosRepository;
        this._manipuladorArquivos = params.manipuladorArquivos;
        this._imagemEventoIdFactory = params.imagemEventoIdFactory;
    }

    public async executar(input: ImagemEventoDTO): Promise<string> {
        const evento = await this._eventosRepository.buscarEventoPorId(EventoId.instanciar(input.id_evento));
        const imagemEventoId = await this._imagemEventoIdFactory.gerarNovoId();
        const urlImagem = await this._manipuladorArquivos.salvar(input.arquivo, imagemEventoId.valor);
        const imagemEvento = ImagemEvento.instanciar({
            id: imagemEventoId,
            urlImagem: urlImagem
        });
        imagemEvento.adicionarEvento(evento);
        await this._imagensEventosRepository.salvarImagemEvento(imagemEvento);

        return urlImagem;
    }
}

export { AdicionarImagemEvento };
