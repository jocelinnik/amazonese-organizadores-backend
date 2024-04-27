import { Expo, ExpoPushMessage } from "expo-server-sdk";

import { ManipuladorNotificacoes, Notificacao } from "@/aplicacao/evento/providers/manipulador-notificacoes";

type ExpoManipuladorNotificacoesParams = {
    conexao: Expo;
};

class ExpoManipuladorNotificacoes implements ManipuladorNotificacoes {

    private readonly _conexao: Expo;

    public constructor(params: ExpoManipuladorNotificacoesParams){
        this._conexao = params.conexao;
    }

    public async enviarNotificacao(dados: Notificacao): Promise<void> {
        const notificacao = this.prepararNotificacao(dados);
        await this._conexao.sendPushNotificationsAsync([notificacao]);
    }

    public async enviarLoteNotificacoes(loteDados: Notificacao[]): Promise<void> {
        const notificacoes: ExpoPushMessage[] = loteDados.map(this.prepararNotificacao.bind(this));
        const chunks = this._conexao.chunkPushNotifications(notificacoes);

        for(let chunk of chunks)
            await this._conexao.sendPushNotificationsAsync(chunk);
    }

    private prepararNotificacao(dados: Notificacao): ExpoPushMessage {
        return {
            to: dados.tokenNotificacao,
            sound: "default",
            title: dados.tituloNotificacao,
            body: dados.textoNotificacao
        };
    }
}

export { ExpoManipuladorNotificacoes };
