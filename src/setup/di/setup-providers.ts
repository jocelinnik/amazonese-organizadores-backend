import { configDotenv } from "dotenv";

import { networkInterfaces } from "node:os";

import { ManipuladorArquivos } from "@/aplicacao/comum/providers/manipulador-arquivos";
import { CifradorSegredos } from "@/aplicacao/organizador/providers/cifrador-segredos";
import { GerenciadorTokenAutenticacao } from "@/aplicacao/organizador/providers/gerenciador-tokens-autenticacao";
import { IdentificadorFactory } from "@/dominio/abstracoes/identificadores/identificador.factory";
import { EventoId } from "@/dominio/evento/identificadores/evento.identificador";
import { ImagemEventoId } from "@/dominio/evento/identificadores/imagem-evento.identificador";
import { ContainerDI } from "@/infraestrutura/comum/di/container-di";
import { CryptoUUIDEventoIdFactory } from "@/infraestrutura/evento/node-crypto/crypto-evento-id.factory";
import { CryptoImagemEventoIdFactory } from "@/infraestrutura/evento/node-crypto/crypto-imagem-evento-id.factory";
import { CryptoCifradorSegredos } from "@/infraestrutura/organizador/node-crypto/crypto-cifrador-segredos";
import { CryptoJWTGerenciadorTokenAutenticacao } from "@/infraestrutura/organizador/node-crypto/crypto-gerenciador-tokens-autenticacao";
import { ManipuladorArquivosLocal } from "@/infraestrutura/comum/node-fs/manipulador-arquivos-local";
import { AzureBlobStorageManipuladorArquivos } from "@/infraestrutura/comum/azure-storage/azure-blobstorage-manipulador-arquivos";

const configurarObjetosProviders = (): void => {
    configDotenv();
    const container = ContainerDI.pegarInstancia();

    // Configurando instâncias de objetos de serviço
    // da aplicação...
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
        // const listaIps = networkInterfaces();
        // const ipLocal = listaIps["Wi-Fi"].find(ip => ip.family === "IPv4");

        // const caminhoImagensEventos = `${process.cwd()}/public/eventos`;
        // const baseURL = `http://${ipLocal.address}:${Number(process.env.HTTP_PORTA as string)}/eventos`;

        // return new ManipuladorArquivosLocal({
        //     caminho: caminhoImagensEventos,
        //     arquivoBaseURL: baseURL
        // });
    });
    container.set("EventoIdFactory", (): IdentificadorFactory<EventoId> => {
        return new CryptoUUIDEventoIdFactory();
    });
    container.set("ImagemEventoIdFactory", (): IdentificadorFactory<ImagemEventoId> => {
        return new CryptoImagemEventoIdFactory();
    });
};

export { configurarObjetosProviders };
