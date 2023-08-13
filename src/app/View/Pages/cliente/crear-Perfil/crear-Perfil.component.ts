import { Component, OnInit } from '@angular/core';
import { crearUsuarioRequest } from 'src/app/Models/Request/Administrador/UsuarioCrearRequest';
import { ClientePerfil } from 'src/app/Models/Request/Cliente_Perfil/ClientePerfil';

@Component({
  selector: 'app-crear-Perfil',
  templateUrl: './crear-Perfil.component.html',
  styleUrls: ['./crear-Perfil.component.Scss']
})
export class CrearPerfilComponent implements OnInit {

  constructor() { }
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
    return (this.cliente.identificacion == '' || this.cliente.correo == '' || this.cliente.nombres == '' || this.cliente.apellidos == '' || this.cliente.fechaNacimiento == '' || this.cliente.telefono == '' || this.cliente.dirreccion == '' || this.cliente.contrasena == '');
  }

}
