abstract class ObjectMapper<K, V> {

    public mapearLista(origemList: Array<K>): Array<V> {
        return origemList.map(origem => this.mapear(origem));
    }

    public abstract mapear(origem: K): V;

}

export { ObjectMapper };
