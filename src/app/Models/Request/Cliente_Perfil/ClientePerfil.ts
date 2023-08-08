export interface ClientePerfil {
    idpersona : number
    nombre : string;
    apellido : string;
    fecha_nacimiento : string;
    telefono : string;
    direccion : string;
    contrasena : string | null;
    tipo_identificacion : string;
    identificacion : string;
    correo: string;
    rol: string;
}