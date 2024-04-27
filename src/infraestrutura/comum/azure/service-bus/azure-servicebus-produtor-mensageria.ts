import { ServiceBusClient, ServiceBusMessage } from "@azure/service-bus";

import { ProdutorMensageria } from "@/aplicacao/comum/providers/produtor-mensageria";

type AzureServiceBusProdutorMensageriaParams = {
    asbConnectionString: string;
};

class AzureServiceBusProdutorMensageria implements ProdutorMensageria {

    private readonly _conexao: ServiceBusClient;

    public constructor(params: AzureServiceBusProdutorMensageriaParams){
        this._conexao = new ServiceBusClient(params.asbConnectionString);
    }

    public async publicarMensagem(fila: string, conteudo: any): Promise<void> {
        const sender = this._conexao.createSender(fila);
        const msg: ServiceBusMessage = {
            body: JSON.stringify(conteudo)
        };

        await sender.sendMessages(msg);
        await sender.close();
    }
}

export { AzureServiceBusProdutorMensageria };
