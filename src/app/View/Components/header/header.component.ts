import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CredencialesModel } from 'src/app/Models/Request/credenciales.model';
import { LoginRespuestaModel } from 'src/app/Models/Response/login-respuesta.model';
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
    private _messageService: MessageService
  ) { }

  idioma_array!: Idioma[];
  id_Rol: number | null = null;

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
        this.varificarCliente();
        this._router.navigate(['/cliente']);
      }
      else{
        this._messageService.add({key: 'login',severity:'error', detail: 'X Correo o contraseña incorrecta', icon: 'pi-cog'})
      }
    })
  }

  varificarCliente(){
    if (localStorage.getItem('idPersona') !== null) {
      this.id_Rol = 1;
    }
  }

}
