import { BusResponse } from "../DataResponse/busResponse.model";

export interface busesResponseFinal {
    codeResponse:number,
    messageResponse:string
    dataResponse: BusResponse[] | null;
}