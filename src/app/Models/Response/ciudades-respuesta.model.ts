import { CiudadModel } from "../DataResponse/ciudades.model";

export interface CiudadResponseModel {
    codeResponse:number,
    messageResponse:string
    dataResponse: CiudadModel[] | null;
}