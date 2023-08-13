import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ClientePerfilRequest } from '../Models/Request/Cliente_Perfil/ClientePerfilRequest';
import { ClientePerfilResponse } from '../Models/Request/Cliente_Perfil/ClientesPerfilResponse';
import { ClientePerfilEditarResponse } from '../Models/Request/Cliente_Perfil/ClientePerfilEditarResponse';
import { ClientePerfilEditarRequest } from '../Models/Request/Cliente_Perfil/ClientePerfilEditarRequest';
import { desactivarUsuarioRequest } from '../Models/Request/Administrador/desactivarUsuarioRequest';
import { EditarUsuarioAdminRequest } from '../Models/Request/Administrador/EditarUsuarioAdminRequest';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }
  private urlEndPoint: string = environment.endpoint+'Usuario/';

  getCliente(id : ClientePerfilRequest) : Observable<ClientePerfilResponse> {
    const urlLogin : string = this.urlEndPoint+'buscar_persona';
    let token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token
    })
    return this.http.post<ClientePerfilResponse>(urlLogin,id,{headers:header});
  }

  getClienteAdmin(id : desactivarUsuarioRequest) : Observable<ClientePerfilResponse> {
    const urlLogin : string = this.urlEndPoint+'buscar_persona_admin';
    let token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token
    })
    return this.http.post<ClientePerfilResponse>(urlLogin,id,{headers:header});
  }

  putCliente(cliente : ClientePerfilEditarRequest) : Observable<ClientePerfilEditarResponse> {
    const urlLogin : string = this.urlEndPoint+'editar-perfil';
    let token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token
    })

    return this.http.post<ClientePerfilEditarResponse>(urlLogin,cliente,{headers:header});
  }

  putClienteAdmin(cliente : EditarUsuarioAdminRequest) : Observable<ClientePerfilEditarResponse> {
    const urlLogin : string = this.urlEndPoint+'editar-perfil-admin';
    let token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token
    })

    return this.http.post<ClientePerfilEditarResponse>(urlLogin,cliente,{headers:header});
  }

  registroLoginCliente(cliente : ClientePerfilRequest) : Observable<any> {
    const urlLogin : string = this.urlEndPoint+'actualiza_login';
    let token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token
    })

    return this.http.post<any>(urlLogin,cliente,{headers:header});
  }
}
