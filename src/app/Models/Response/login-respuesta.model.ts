import { LoginResponseModel } from "../DataResponse/login-response.model";

export interface LoginRespuestaModel {
    codeResponse : number,
    messageResponse : string,
    dataResponse : LoginResponseModel
}