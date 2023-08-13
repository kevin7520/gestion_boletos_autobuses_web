import { ClienteResponse } from "../../DataResponse/Administrador/usuarios";

export interface usuarioRespuestaResponse {
    codeResponse:number,
    messageResponse:string
    dataResponse: ClienteResponse[] | null;
}