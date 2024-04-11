/**
 * 
 * Tipagem que define uma função de callback utilizada
 * para resolução da dependência definida.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
type ResolvedorDependencia = <T>(container: ContainerDI) => Promise<T>;

/**
 * 
 * Classe que implementa um container de gerenciamento
 * de componentes definidos e utilizados pela aplicação,
 * fornecendo um mecanismo de utilização de injeção de
 * dependências.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
class ContainerDI {

    /**
     * 
     * Container interno de dependências já resolvidas.
     */
    private dependenciasResolvidas: Map<string, any>;

    /**
     * 
     * Container interno de dependências para resolver.
     */
    private dependenciasParaResolver: Map<string, ResolvedorDependencia>;

    /**
     * 
     * Referência única do container de dependências,
     * implementando o padrão de projetos Singleton.
     */
    private static instancia?: ContainerDI;

    /**
     * 
     * No construtor interno, instanciamos os containers
     * de dependências como vazios.
     * 
     * O construtor privado implementa o padrão de projetos
     * Singleton.
     */
    private constructor(){
        this.dependenciasResolvidas = new Map();
        this.dependenciasParaResolver = new Map();
    }

    /**
     * 
     * Método que devolve uma dependência a partir de uma
     * chave de identificação.
     * 
     * @param id Chave de identificação da dependência buscada.
     * @returns Referência da dependência encontrada.
     * @throws {Error} Não existe nenhuma dependência com a chave
     * especificada.
     */
    public get<T>(id: string): T {
        // Se não tiver nenhuma referência para a chave 
        // passada, levanta uma exceção...
        if(!this.contem(id))
            throw new Error(`Nao foi encontrada uma instancia para a chave ${id}`);

        // Se a referência da chave buscada já estiver 
        // no container de dependências já resolvidas,
        // retorna...
        if(this.dependenciasResolvidas.has(id))
            return this.dependenciasResolvidas.get(id);

        // Pegamos a função de callback para resolver 
        // a dependência buscada...
        const cbDefinicao = this.dependenciasParaResolver.get(id) as ResolvedorDependencia;
        const definicao = cbDefinicao(this) as T;

        // Adicionamos a dependência resolvida no container
        // de dependências já resolvidas e removemos a função
        // do container de dependências para resolver...
        this.dependenciasResolvidas.set(id, definicao);
        this.dependenciasParaResolver.delete(id);

        return definicao;
    }

    /**
     * 
     * Método que adiciona uma nova dependência ou uma nova
     * função de resolução no container.
     * 
     * @param id Chave de identificação da dependência.
     * @param resolvedor Valor já inserido ou uma função de
     * resolução de dependências.
     */
    public set(id: string, resolvedor: ResolvedorDependencia | any): void {
        if(typeof resolvedor === "function")
            this.dependenciasParaResolver.set(id, resolvedor);
        else
            this.dependenciasResolvidas.set(id, resolvedor);
    }

    /**
     * 
     * Método que verifica se há alguma referência de dependência
     * para uma chave de identificação.
     * @param id Chave de identificação da dependência buscada.
     * @returns **Verdadeiro** se existe alguma referência de
     * dependência para a chave buscada; **Falso** caso contrário.
     */
    public contem(id: string): boolean {
        return (
            this.dependenciasResolvidas.has(id) ||
            this.dependenciasParaResolver.has(id)
        );
    }

    /**
     * 
     * Método que retorna a instância do container de gestão de 
     * dependências, implementando o padrão de projetos Singleton.
     * 
     * @returns Instância do container de gestão de dependências.
     */
    public static pegarInstancia(): ContainerDI {
        if(!ContainerDI.instancia)
            ContainerDI.instancia = new ContainerDI();

        return ContainerDI.instancia;
    }
}

export { ContainerDI };
