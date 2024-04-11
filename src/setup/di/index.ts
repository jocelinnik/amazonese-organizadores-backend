import { configurarObjetosBD } from "./setup-bd";
import { configurarObjetosCasosUso } from "./setup-casos-uso";
import { configurarObjetosHTTP } from "./setup-http";
import { configurarObjectMappers } from "./setup-mappers";
import { configurarObjetosProviders } from "./setup-providers";

const configurarDependencias = (): void => {
    configurarObjectMappers();
    configurarObjetosBD();
    configurarObjetosProviders();
    configurarObjetosCasosUso();
    configurarObjetosHTTP();
};

export { configurarDependencias };
