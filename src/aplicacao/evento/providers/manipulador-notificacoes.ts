interface Notificacao {
    tokenNotificacao: string;
    tituloNotificacao: string;
    textoNotificacao: string;
}

interface ManipuladorNotificacoes {

    enviarNotificacao(dados: Notificacao): Promise<void>;

    enviarLoteNotificacoes(loteDados: Array<Notificacao>): Promise<void>;

}

export { ManipuladorNotificacoes, Notificacao };
