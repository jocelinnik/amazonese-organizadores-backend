import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";
import { UrlImagemVO } from "@/dominio/comum/value-objects/url-imagem.vo";
import { ImagemEventoException } from "@/dominio/evento/excecoes/modelos/imagem-evento.exception";
import { ImagemEventoId } from "@/dominio/evento/identificadores/imagem-evento.identificador";
import { Evento } from "./evento.aggregate";

type NewImagemEventoParams = {
    id: ImagemEventoId;
    urlImagem: UrlImagemVO;
};
type InstanciarImagemEventoParams = {
    id: ImagemEventoId;
    urlImagem?: string;
};

class ImagemEvento {

    private readonly _id: ImagemEventoId;
    private readonly _urlImagem: UrlImagemVO;
    private _evento?: Evento;

    private constructor(params: NewImagemEventoParams){
        this._id = params.id;
        this._urlImagem = params.urlImagem;
    }

    public get id(): ImagemEventoId {
        return this._id;
    }

    public get urlImagem(): UrlImagemVO {
        return this._urlImagem;
    }

    public get evento(): Evento | undefined {
        return this._evento;
    }

    public adicionarEvento(evento: Evento): void {
        this._evento = evento;
    }

    public static instanciar(params: InstanciarImagemEventoParams): ImagemEvento {
        try{
            return new ImagemEvento({
                id: params.id,
                urlImagem: UrlImagemVO.instanciar(params.urlImagem)
            });
        }catch(e: any){
            const voErro = e as BaseVOException;

            throw new ImagemEventoException("Não foi possível instanciar uma imagem de evento.", voErro);
        }
    }
}

export { ImagemEvento };
