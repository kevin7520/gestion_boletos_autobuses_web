import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AsientosAccionesRequest } from '../Models/Request/asientosAccionesRequest';
import { AccionesAsientosResponse } from '../Models/Response/acciones-asientos-respuesta';
import { Observable } from 'rxjs';
import { desactivarUsuarioRequest } from '../Models/Request/Administrador/desactivarUsuarioRequest';
import { desactivarUsuarioResponse } from '../Models/Response/Administrador/desactivarUsuarioResponse';
import { CrearViajeRequest } from '../Models/Request/crearViajeRequest';
import { GeneralResponse } from '../Models/Response/generalResponse';
import { crearViajeAdmin } from '../Models/Request/Administrador/crearViajeAdministrador';
import { CrearFacturaRequest, FacturaRequestFinal } from '../Models/Request/crearFactura';

@Injectable({
  providedIn: 'root'
})
export class GestionTablasGeneralesService {

  constructor(private http: HttpClient) { }

  private urlEndPoint: string = environment.endpoint+'Gestion_Tablas_Generales_/';

  seleccionarAsiento(AsientoRequest : AsientosAccionesRequest) : Observable<AccionesAsientosResponse>{
    const urlBuscarCiudad : string = this.urlEndPoint+'seleccionar_asiento';
    return this.http.post<AccionesAsientosResponse>(urlBuscarCiudad,AsientoRequest);
  }

  recuperarAsiento(AsientoRequest : AsientosAccionesRequest) : Observable<AccionesAsientosResponse>{
    const urlBuscarCiudad : string = this.urlEndPoint+'recuperar_asiento';
    return this.http.post<AccionesAsientosResponse>(urlBuscarCiudad,AsientoRequest);
  }

  desabilitarUsuario(datos : desactivarUsuarioRequest) : Observable<desactivarUsuarioResponse>{
    const urlLogin : string = this.urlEndPoint+'desabilitar_usuario';
    let token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token
    })

    return this.http.post<desactivarUsuarioResponse>(urlLogin,datos,{headers:header});
  }

  crearViaje(datos : crearViajeAdmin) : Observable<GeneralResponse>{
    const urlLogin : string = this.urlEndPoint+'crear-viaje';
    let token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token
    })

    return this.http.post<GeneralResponse>(urlLogin,datos,{headers:header});
  }

  crearFactura(dato : FacturaRequestFinal) : Observable<GeneralResponse>{
    const urlBuscarCiudad : string = this.urlEndPoint+'crear_factura';
    return this.http.post<GeneralResponse>(urlBuscarCiudad,dato);
  }


}
