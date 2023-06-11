import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CredencialesModel } from '../Models/Request/credenciales.model';
import { LoginRespuestaModel } from '../Models/Response/login-respuesta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IniciarSesionService {

constructor(private http: HttpClient) { }
private urlEndPoint: string = environment.endpoint+'Usuario/';

iniciarSesion(credenciales : CredencialesModel) : Observable<LoginRespuestaModel> { 
  const urlLogin : string = this.urlEndPoint+'login';
  return this.http.post<LoginRespuestaModel>(urlLogin,credenciales);
}

}
