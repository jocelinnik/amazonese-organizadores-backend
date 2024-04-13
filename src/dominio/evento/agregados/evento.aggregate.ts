import { BaseVOException } from "@/dominio/abstracoes/excecoes/vo.exception";
import { EventoException } from "@/dominio/evento/excecoes/modelos/evento.exception";
import { EventoId } from "@/dominio/evento/identificadores/evento.identificador";
import { CategoriaVO } from "@/dominio/evento/value-objects/categoria.vo";
import { DatasEventoVO, InstanciarDatasVOParams } from "@/dominio/evento/value-objects/datas-evento.vo";
import { DescricaoVO } from "@/dominio/evento/value-objects/descricao.vo";
import { LocalidadeVO, InstanciarLocalidadeVOParams } from "@/dominio/evento/value-objects/localidade.vo";
import { NomeVO } from "@/dominio/comum/value-objects/nome.vo";
import { PrecoVO } from "@/dominio/evento/value-objects/preco.vo";
import { Organizador } from "@/dominio/organizador/modelos/organizador.model";
import { ImagemEvento } from "./imagem-evento.aggregate";

type NewEventoParams = {
    id: EventoId;
    nome: NomeVO;
    descricao: DescricaoVO;
    preco: PrecoVO;
    localidade: LocalidadeVO;
    datasEvento: DatasEventoVO;
};
type InstanciarEventoParams = {
    id: EventoId;
    nome?: string;
    descricao?: string;
    preco?: number;
    localidade: InstanciarLocalidadeVOParams;
    datasEvento: InstanciarDatasVOParams;
};

class Evento {

    private readonly _id: EventoId;
    private _nome: NomeVO;
    private _descricao: DescricaoVO;
    private _preco: PrecoVO;
    private _localidade: LocalidadeVO;
    private _categorias: Array<CategoriaVO>;
    private _imagens: Array<ImagemEvento>;
    private _datasEvento: DatasEventoVO;
    private _organizador?: Organizador;

    private constructor(params: NewEventoParams){
        this._id = params.id;
        this._nome = params.nome;
        this._descricao = params.descricao;
        this._preco = params.preco;
        this._localidade = params.localidade;
        this._datasEvento = params.datasEvento;
        this._categorias = [];
        this._imagens = [];
    }

    public get id(): EventoId {
        return this._id;
    }

    public get nome(): NomeVO {
        return this._nome;
    }

    public set nome(novoNome: NomeVO) {
        this._nome = novoNome;
    }

    public get descricao(): DescricaoVO {
        return this._descricao;
    }

    public set descricao(novaDescricao: DescricaoVO) {
        this._descricao = novaDescricao;
    }

    public get preco(): PrecoVO {
        return this._preco;
    }

    public set preco(novoPreco: PrecoVO) {
        this._preco = novoPreco;
    }

    public get localidade(): LocalidadeVO {
        return this._localidade;
    }

    public set localidade(novaLocalidade: LocalidadeVO) {
        this._localidade = novaLocalidade;
    }

    public get categorias(): Array<CategoriaVO> {
        return this._categorias;
    }

    public get imagens(): Array<ImagemEvento> {
        return this._imagens;
    }

    public get datasEvento(): DatasEventoVO {
        return this._datasEvento;
    }

    public set datasEvento(novasDatasEvento: DatasEventoVO) {
        this._datasEvento = novasDatasEvento;
    }

    public get organizador(): Organizador | undefined {
        return this._organizador;
    }

    public adicionarCategoria(categoria: CategoriaVO): void {
        this._categorias.push(categoria);
    }

    public adicionarImagem(imagem: ImagemEvento): void {
        this._imagens.push(imagem);
    }

    public adicionarOrganizador(organizador: Organizador): void {
        this._organizador = organizador;
    }

    public static instanciar(params: InstanciarEventoParams): Evento {
        try{
            return new Evento({
                id: params.id,
                nome: NomeVO.instanciar(params.nome),
                descricao: DescricaoVO.instanciar(params.descricao),
                preco: PrecoVO.instanciar(params.preco),
                localidade: LocalidadeVO.instanciar(params.localidade),
                datasEvento: DatasEventoVO.instanciar(params.datasEvento)
            });
        }catch(e: any){
            const voErro = e as BaseVOException;

            throw new EventoException("Não foi possível instanciar um evento.", voErro);
        }
    }
}

export { Evento };
