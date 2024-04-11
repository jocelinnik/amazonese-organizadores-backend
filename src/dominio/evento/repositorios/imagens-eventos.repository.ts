import { ImagemEvento } from "@/dominio/evento/agregados/imagem-evento.aggregate";

interface ImagensEventosRepository {

    salvarImagemEvento(imagemEvento: ImagemEvento): Promise<void>;

}

export { ImagensEventosRepository };
