import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CiudadResponseModel } from '../Models/Response/ciudades-respuesta.model';
import { ConsultarBoletosRequest } from '../Models/Request/consultarBoletosRequest.model';
import { ConsultarBoletosResponseModel } from '../Models/Response/consultar-boletos-respuesta.model';
import { BuscarAsientosRequest } from '../Models/Request/buscarAsientoRequest';
import { BuscarAsientosResponse } from '../Models/Response/buscar-asientos-respuesta.model';
import { usuarioRespuestaResponse } from '../Models/Response/Administrador/usuarios-respuesta';
import { ClientePerfilRequest } from '../Models/Request/Cliente_Perfil/ClientePerfilRequest';
import { BusResponse } from '../Models/DataResponse/busResponse.model';
import { busesResponseFinal } from '../Models/Response/busesResponse';

@Injectable({
  providedIn: 'root'
})
export class ConsultaGeneralesService {

  constructor(private http: HttpClient) { }

  private urlEndPoint: string = environment.endpoint+'Consulta_Generales_/';

  getCiudades(): Observable<CiudadResponseModel>{
    const urlBuscarCiudad : string = this.urlEndPoint+'buscar_ciudades';
    return this.http.post<CiudadResponseModel>(urlBuscarCiudad,'');
  }
 
  getBuses(): Observable<busesResponseFinal>{
    const urlBuscarCiudad : string = this.urlEndPoint+'buscar_buses';
    return this.http.post<busesResponseFinal>(urlBuscarCiudad,'');
  }

  getRutas(): Observable<any>{
    const urlBuscarCiudad : string = this.urlEndPoint+'buscar_rutas';
    return this.http.post<any>(urlBuscarCiudad,'');
  }

  getBoletos(boletoRequest : ConsultarBoletosRequest): Observable<ConsultarBoletosResponseModel>{
    const urlBuscarCiudad : string = this.urlEndPoint+'buscar_boletos';
    return this.http.post<ConsultarBoletosResponseModel>(urlBuscarCiudad,boletoRequest);
  }

  getAsientos(AsientoRequest : BuscarAsientosRequest) : Observable<BuscarAsientosResponse>{
    const urlBuscarCiudad : string = this.urlEndPoint+'buscar_asientos';
    return this.http.post<BuscarAsientosResponse>(urlBuscarCiudad,AsientoRequest);
  }

  getUsuario(cliente : ClientePerfilRequest) : Observable<usuarioRespuestaResponse> {
    const urlLogin : string = this.urlEndPoint+'buscar_personas';
    let token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token
    })

    return this.http.post<usuarioRespuestaResponse>(urlLogin,cliente,{headers:header});
  }

}
