import { Component, OnInit } from '@angular/core';
import { crearUsuarioRequest } from 'src/app/Models/Request/Cliente_Perfil/UsuarioCrearRequest';
import { ClientePerfil } from 'src/app/Models/Request/Cliente_Perfil/ClientePerfil';
import { ClienteService } from 'src/app/Services/cliente.service';

@Component({
  selector: 'app-crear-Perfil',
  templateUrl: './crear-Perfil.component.html',
  styleUrls: ['./crear-Perfil.component.Scss']
})
export class CrearPerfilComponent implements OnInit {

  constructor(private clienteService : ClienteService) { }
  cliente: crearUsuarioRequest = {
    nombres : '',
    apellidos : '',
    fechaNacimiento: '',
    telefono: '',
    dirreccion: '',
    contrasena: '',
    tipoIdentificacion: 'C',
    identificacion: '',
    correo: '', 
    tipoRol: 4,
  };

  id_rol : number = Number(localStorage.getItem('rol'));

  tipoIdentificacionValue = {
    name: 'Cédula', code: 'C' 
  };
  tipoRolValue = {
    name: 'Usuario', code: 4 
  };

  fechaValue! : Date ;

  tipoIdentificacion = [
    { name: 'Cédula', code: 'C' },
    { name: 'Pasaporte', code: 'P' },
    { name: 'Ruc', code: 'R' },
  ]

  tipoRol = [
    { name: 'Usuario', code: 4 },
    { name: 'Chofer', code: 3 },
    { name: 'Vendedor', code: 2 }
  ]
  ngOnInit() {
  }

  comprobarDartos() : boolean {
    return (this.cliente.identificacion == '' || this.cliente.correo == '' || this.cliente.nombres == '' || this.cliente.apellidos == '' || this.fechaValue == null || this.cliente.telefono == '' || this.cliente.dirreccion == '' || this.cliente.contrasena == '');
  }

  crearUsuario(){
    this.cliente.tipoIdentificacion = this.tipoIdentificacionValue.code;
    this.cliente.tipoRol = this.tipoRolValue.code;
    const anio = this.fechaValue.getFullYear();
    const mes = this.fechaValue.getMonth() + 1; 
    const dia = this.fechaValue.getDate();
    this.cliente.fechaNacimiento  = `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
    if(localStorage.getItem('rol') != null){
      this.clienteService.crearusuarioAdmin({id_Administrador : this.id_rol,persona : this.cliente}).subscribe(respuesta=>{
        alert(respuesta.messageResponse);
        if(respuesta.codeResponse == 200)
        window.location.reload();
      });
    }
    else{
      this.clienteService.crearusuario(this.cliente).subscribe(respuesta=>{
        if(respuesta.codeResponse == 200){
          alert("Usuario creado con exito ahora solo inicia sesión");
          window.location.reload();
        }
        else{
          alert(respuesta.messageResponse);
        }
      });
    }
    
  }

}
