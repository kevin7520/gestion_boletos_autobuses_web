import { ClienteBoletoResponse } from "./ClienteBoletoRequest";
import { asientosSeleccionado } from "./boletoSeleccionadoRequest";
import { FormaPago } from "./formaPagoRequest";

export interface CompraBoletoFinalRequest {
    id_boleto: string;
    formaPago: FormaPago | null;
    ClienteBoletoResponse : ClienteBoletoResponse | null;
    asientosSeleccionado : asientosSeleccionado[];
}