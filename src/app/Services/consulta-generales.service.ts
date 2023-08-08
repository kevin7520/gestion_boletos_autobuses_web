import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CiudadResponseModel } from '../Models/Response/ciudades-respuesta.model';
import { ConsultarBoletosRequest } from '../Models/Request/consultarBoletosRequest.model';
import { ConsultarBoletosResponseModel } from '../Models/Response/consultar-boletos-respuesta.model';
import { BuscarAsientosRequest } from '../Models/Request/buscarAsientoRequest';
import { BuscarAsientosResponse } from '../Models/Response/buscar-asientos-respuesta.model';

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

  getBoletos(boletoRequest : ConsultarBoletosRequest): Observable<ConsultarBoletosResponseModel>{
    const urlBuscarCiudad : string = this.urlEndPoint+'buscar_boletos';
    return this.http.post<ConsultarBoletosResponseModel>(urlBuscarCiudad,boletoRequest);
  }

  getAsientos(AsientoRequest : BuscarAsientosRequest) : Observable<BuscarAsientosResponse>{
    const urlBuscarCiudad : string = this.urlEndPoint+'buscar_asientos';
    return this.http.post<BuscarAsientosResponse>(urlBuscarCiudad,AsientoRequest);
  }

}
