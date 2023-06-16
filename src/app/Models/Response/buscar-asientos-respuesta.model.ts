import { BuscarAsientosDataResponse } from "../DataResponse/consultarAsientoResponse";

export interface BuscarAsientosResponse {
    codeResponse:number,
    messageResponse:string
    dataResponse: BuscarAsientosDataResponse[] | null;

}