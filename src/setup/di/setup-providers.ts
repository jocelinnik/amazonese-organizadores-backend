import { configDotenv } from "dotenv";
import { Expo } from "expo-server-sdk";

import { ManipuladorArquivos } from "@/aplicacao/comum/providers/manipulador-arquivos";
import { ProdutorMensageria } from "@/aplicacao/comum/providers/produtor-mensageria";
import { ManipuladorNotificacoes } from "@/aplicacao/evento/providers/manipulador-notificacoes";
import { CifradorSegredos } from "@/aplicacao/organizador/providers/cifrador-segredos";
import { GerenciadorTokenAutenticacao } from "@/aplicacao/organizador/providers/gerenciador-tokens-autenticacao";
import { IdentificadorFactory } from "@/dominio/abstracoes/identificadores/identificador.factory";
import { ContatoUsuarioId } from "@/dominio/comum/identificadores/contato-usuario.identificador";
import { EventoId } from "@/dominio/evento/identificadores/evento.identificador";
import { ImagemEventoId } from "@/dominio/evento/identificadores/imagem-evento.identificador";
import { AzureBlobStorageManipuladorArquivos } from "@/infraestrutura/comum/azure/blob-storage/azure-blobstorage-manipulador-arquivos";
import { AzureServiceBusProdutorMensageria } from "@/infraestrutura/comum/azure/service-bus/azure-servicebus-produtor-mensageria";
import { ContainerDI } from "@/infraestrutura/comum/di/container-di";
import { CryptoContatoUsuarioIdFactory } from "@/infraestrutura/comum/node-crypto/crypto-contato-usuario-id.factory";
import { ExpoManipuladorNotificacoes } from "@/infraestrutura/evento/expo/expo-manipulador-notificacoes";
import { CryptoUUIDEventoIdFactory } from "@/infraestrutura/evento/node-crypto/crypto-evento-id.factory";
import { CryptoImagemEventoIdFactory } from "@/infraestrutura/evento/node-crypto/crypto-imagem-evento-id.factory";
import { CryptoCifradorSegredos } from "@/infraestrutura/organizador/node-crypto/crypto-cifrador-segredos";
import { CryptoJWTGerenciadorTokenAutenticacao } from "@/infraestrutura/organizador/node-crypto/crypto-gerenciador-tokens-autenticacao";

const configurarObjetosProviders = (): void => {
    configDotenv();
    const container = ContainerDI.pegarInstancia();

    // Configurando instâncias de objetos de serviço
    // da aplicação...
    container.set("ContatoUsuarioIdFactory", (): IdentificadorFactory<ContatoUsuarioId> => {
        return new CryptoContatoUsuarioIdFactory();
    });
    container.set("CifradorSenhas", (): CifradorSegredos => {
        return new CryptoCifradorSegredos({
            algoritmo: process.env.CIFRADOR_SENHAS_ALGORITMO as string,
            segredo: process.env.CIFRADOR_SENHAS_SEGREDO as string,
            iteracoes: Number(process.env.CIFRADOR_SENHAS_ITERACOES as string)
        });
    });
    container.set("CifradorFrasesSecretas", (): CifradorSegredos => {
        return new CryptoCifradorSegredos({
            algoritmo: process.env.CIFRADOR_FRASES_SECRETAS_ALGORITMO as string,
            segredo: process.env.CIFRADOR_FRASES_SECRETAS_SEGREDO as string,
            iteracoes: Number(process.env.CIFRADOR_FRASES_SECRETAS_ITERACOES as string)
        });
    });
    container.set("GerenciadorTokenAutenticacao", (): GerenciadorTokenAutenticacao => {
        return new CryptoJWTGerenciadorTokenAutenticacao({
            chave: process.env.JWT_CHAVE as string,
            sub: process.env.JWT_SUB as string,
            tempoVidaToken: Number(process.env.JWT_EXPIRACAO_EM_MINUTOS as string)
        });
    });
    container.set("ManipuladorImagensEventos", (): ManipuladorArquivos => {
        return new AzureBlobStorageManipuladorArquivos({
            asaConnectionString: process.env.AZURE_STORAGE_ACCOUNT as string,
            nomeContainer: process.env.AZURE_CONTAINER_IMAGENS_EVENTOS as string,
            containerBaseURL: process.env.AZURE_BLOB_STORAGE_BASEURL as string
        });
    });
    container.set("EventoIdFactory", (): IdentificadorFactory<EventoId> => {
        return new CryptoUUIDEventoIdFactory();
    });
    container.set("ImagemEventoIdFactory", (): IdentificadorFactory<ImagemEventoId> => {
        return new CryptoImagemEventoIdFactory();
    });
    container.set("ManipuladorNotificacoes", (): ManipuladorNotificacoes => {
        const conexao = new Expo({
            accessToken: process.env.EXPO_ACCESS_TOKEN as string,
            useFcmV1: false
        });

        return new ExpoManipuladorNotificacoes({ conexao });
    });
    container.set("ProdutorMensageria", (): ProdutorMensageria => {
        const asbConnectionString = process.env.AZURE_SERVICEBUS_CONEXAO as string;

        return new AzureServiceBusProdutorMensageria({ asbConnectionString });
    });
};

export { configurarObjetosProviders };
