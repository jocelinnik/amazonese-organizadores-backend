/**
 * 
 * Classe de exceção que define a situação
 * de um token de autenticação expirado.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
class TokenExpiradoError extends Error {

    public constructor(){
        super("Token de autenticação expirado");
    }
}

/**
 * 
 * Classe de exceção que define a situação
 * de um token de autenticação inválido.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
class TokenInvalidoError extends Error {

    public constructor(){
        super("Token de autenticação inválido");
    }
}

export { TokenExpiradoError, TokenInvalidoError };
