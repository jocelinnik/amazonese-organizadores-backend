import { CpfCnpjOrganizador } from "@/dominio/organizador/identificadores/organizador.identificador";
import { Organizador } from "@/dominio/organizador/modelos/organizador.model";

interface OrganizadoresRepository {

    buscarPorCpfCnpj(cpfOUcnpj: CpfCnpjOrganizador): Promise<Organizador>;

    salvar(organizador: Organizador): Promise<void>;

}

export { OrganizadoresRepository };
