import { ClientePerfilEditarRequest } from "../Cliente_Perfil/ClientePerfilEditarRequest";

export interface EditarUsuarioAdminRequest {
    id_Administrador : number;
    editarPersona : ClientePerfilEditarRequest
}