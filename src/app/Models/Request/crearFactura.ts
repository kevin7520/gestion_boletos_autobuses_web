export interface CrearFacturaRequest {
    cantidadCompra : number;
    idRuta : number;
    precioFinal : number;
    precio_sin_iva : number;
    formaPago : string;
    identificacion : string ;
    tipo_identificacion : string ;
    correo : string ;
    celular : string;
    nombre : string ;
}

export interface CrearFacturaCliente {
    identificacion : string ;
    tipo_identificacion : string ;
    correo : string ;
    celular : string;
    nombre : string ;
    id_asiento : number;
    id_cliente : number | null;
}

export interface FacturaRequestFinal {
    clientes : CrearFacturaCliente[];
    factura : CrearFacturaRequest;
}