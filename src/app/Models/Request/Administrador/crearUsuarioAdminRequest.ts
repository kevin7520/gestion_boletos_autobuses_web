import { crearUsuarioRequest } from "../Cliente_Perfil/UsuarioCrearRequest";

export interface crearUsuarioAdminRequest {
    id_Administrador : number;
    persona : crearUsuarioRequest;
}