import { ConsultarBoletosResponse } from "../DataResponse/consultarBoletosResponse.model";

export interface ConsultarBoletosResponseModel {
    codeResponse:number,
    messageResponse:string
    dataResponse: ConsultarBoletosResponse[] | null;
}