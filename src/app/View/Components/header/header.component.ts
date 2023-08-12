import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClientePerfilRequest } from 'src/app/Models/Request/Cliente_Perfil/ClientePerfilRequest';
import { CredencialesModel } from 'src/app/Models/Request/credenciales.model';
import { LoginRespuestaModel } from 'src/app/Models/Response/login-respuesta.model';
import { ClienteService } from 'src/app/Services/cliente.service';
import { IniciarSesionService } from 'src/app/Services/iniciar-sesion.service';

interface Idioma {
  name: string;
  code: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {


  @Output() idioma  = new EventEmitter(); 

  constructor( 
    private _router: Router, 
    private _iniciarSesionService : IniciarSesionService,
    private _messageService: MessageService,
    private clienteService : ClienteService
  ) { }

  idioma_array!: Idioma[];
  id_Rol: number | null = null;
  usuario : string = '';
  fechaLogin : string = '';

  selectedIdioma: Idioma = { name: 'Español', code: 'es' };

  credenciales : CredencialesModel = {
    correo : '',
    password : '',
  };

  ngOnInit() {
      this.idioma_array = [
          { name: 'Español', code: 'es' },
          { name: 'English', code: 'en' },
      ];
      this.varificarCliente();
  }

  cambioIdioma(section : any){
    this.idioma.emit(section.value.code);
  }

  cambioSection(section : string){
    this._router.navigate([''], { queryParams: { id:  section} });
  }

  inicioSeccion : boolean = false;

  abrirModal(){
    this.inicioSeccion = true;
  }

  iniciarSession(){
    this._iniciarSesionService.iniciarSesion(this.credenciales).subscribe((respuesta : LoginRespuestaModel)=>{
      if(respuesta.codeResponse == 200){
        this._messageService.add({key: 'login', severity:'success', detail: 'X Inicio de sessión exitosa', icon: 'pi-cog'})
        localStorage.setItem('idPersona', String(respuesta.dataResponse.idPersona));
        localStorage.setItem('token', String(respuesta.dataResponse.token));
        localStorage.setItem('rol', String(respuesta.dataResponse.idRol));
        this.varificarCliente();
        this.inicioSeccion = false;
        switch(String(respuesta.dataResponse.idRol)){
          case "4": 
            this._router.navigate(['/usuario']);
            break;
          case "3":
            this._router.navigate(['/chofer']);
            break;
          case "2":
            this._router.navigate(['/vedndedor']);
            break;
          case "1":
            this._router.navigate(['/administrador']);
            break;
        }
        this.RegistrarEntrada();
      }
      else{
        this._messageService.add({key: 'login',severity:'error', detail: 'X Correo o contraseña incorrecta', icon: 'pi-cog'})
      }
    })
  }

  varificarCliente(){
    if (localStorage.getItem('idPersona') !== null) {
      this.id_Rol = Number(localStorage.getItem('rol'));
      this.RegistrarEntrada();
    }
  }

  RegistrarEntrada(){
    const id : ClientePerfilRequest = {
      id_persona : Number(localStorage.getItem('idPersona'))
    }
    this.clienteService.registroLoginCliente(id!).subscribe(datosCliente=>{
      this.usuario = datosCliente.dataResponse.usuario;
      this.fechaLogin = datosCliente.dataResponse.fecha;
    });
  }

  cerrarSesion(){
    localStorage.clear();
  }

}
