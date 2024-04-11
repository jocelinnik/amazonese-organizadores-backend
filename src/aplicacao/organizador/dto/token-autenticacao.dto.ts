import { BaseDTO } from "@/aplicacao/abstracoes/dto/base.dto";

/**
 * 
 * Interface que define os dados de uma 
 * carga de dados em um token de autenticação.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
interface CargaTokenAutenticacaoDTO extends BaseDTO {
    sub: string;
    exp: number;
    dados: any;
}

/**
 * 
 * Tipagem que define os dados de um
 * token de autenticação.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
interface TokenAutenticacaoDTO extends BaseDTO {
    access_token: string;
    expiracao: number;
    refresh_token?: string;
    refresh_expiracao?: number;
}

export { CargaTokenAutenticacaoDTO, TokenAutenticacaoDTO };
