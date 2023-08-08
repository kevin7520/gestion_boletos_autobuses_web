import { Component, OnInit } from '@angular/core';
import { ClientePerfil } from 'src/app/Models/Request/Cliente_Perfil/ClientePerfil';
import { ClientePerfilRequest } from 'src/app/Models/Request/Cliente_Perfil/ClientePerfilRequest';
import { ClienteService } from 'src/app/Services/cliente.service';
import * as lodash from 'lodash';
import { ClientePerfilEditarRequest } from 'src/app/Models/Request/Cliente_Perfil/ClientePerfilEditarRequest';

@Component({
  selector: 'app-Editar_Perfil',
  templateUrl: './Editar_Perfil.component.html'
})
export class Editar_PerfilComponent implements OnInit {

  constructor( private clienteService : ClienteService) { }
  cliente: ClientePerfil = {
    idpersona : 0,
    nombre : '',
    apellido : '',
    fecha_nacimiento: '',
    telefono: '',
    direccion: '',
    contrasena: '',
    tipo_identificacion: '',
    identificacion: '',
    correo: '', 
    rol: '',
  };
  clienteCopia!: ClientePerfil;
  contrasena_perfil : string = '';
  ngOnInit() {
    this.obtenerCliente();
  }
  obtenerCliente(){
    const id : ClientePerfilRequest = {
      id_persona : Number(localStorage.getItem('idPersona'))
    }
    this.clienteService.getCliente(id!).subscribe(datosCliente=>{
      const [fechaParte, horaParte] = datosCliente.dataResponse.fecha_nacimiento.split(' ');
      datosCliente.dataResponse.fecha_nacimiento = fechaParte;
      this.cliente = datosCliente.dataResponse;
      this.cliente.contrasena = null;
      this.clienteCopia = lodash.cloneDeep(this.cliente);
    });
  }

  editarCliente(){
    const cliente_request : ClientePerfilEditarRequest = {
      id_persona : this.cliente.idpersona,
      correo : this.cliente.correo,
      contrasena : this.contrasena_perfil,
      dirreccion : this.cliente.direccion,
      telefono : this.cliente.telefono,
      nueva_contrasena : (this.cliente.contrasena != null) ? this.cliente.contrasena : this.contrasena_perfil,
    }

    console.log(this.cliente);
    console.log(cliente_request);
    this.clienteService.putCliente(cliente_request).subscribe(respuesta => {
      if(respuesta.codeResponse == 404){
        alert("Contraseña incorrecta");
      }
      if(respuesta.codeResponse == 200){
        alert("Usuario editado con exito");
        window.location.reload();
      }
      if(respuesta.codeResponse == 444 || respuesta.codeResponse == 500){
        alert(respuesta.messageResponse);
      }
    });
  }

  habilitarBotonGuardar() : boolean{
    return lodash.isEqual(this.cliente,this.clienteCopia)
  }

}
