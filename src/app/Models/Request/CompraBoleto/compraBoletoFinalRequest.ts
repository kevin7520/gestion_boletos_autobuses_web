import { ClienteBoletoResponse } from "./ClienteBoletoRequest";
import { asientosSeleccionado } from "./boletoSeleccionadoRequest";

export interface CompraBoletoFinalRequest {
    id_boleto: string;
    formaPago: string;
    ClienteBoletoResponse : ClienteBoletoResponse;
    asientosSeleccionado : asientosSeleccionado[];
}