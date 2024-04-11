abstract class ObjectMapper<K, V> {

    public mapearListaOrigemParaListaDestino(origemList: Array<K>): Array<V> {
        return origemList.map(origem => this.mapearOrigemParaDestino(origem));
    }

    public abstract mapearOrigemParaDestino(origem: K): V;

}

export { ObjectMapper };
