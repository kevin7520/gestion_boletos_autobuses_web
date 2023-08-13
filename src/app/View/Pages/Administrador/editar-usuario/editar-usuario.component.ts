import { Component, OnInit } from '@angular/core';
import { ClienteResponse } from 'src/app/Models/DataResponse/Administrador/usuarios';
import { ConsultaGeneralesService } from 'src/app/Services/consulta-generales.service';
import { GestionTablasGeneralesService } from 'src/app/Services/gestion-tablas-generales.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.Scss']
})
export class EditarUsuarioComponent implements OnInit {

  constructor(private consultasService : ConsultaGeneralesService, private gestionService : GestionTablasGeneralesService) { }

  sizeTable = { name: 'Small', class: 'p-datatable-sm' };
    
  usuarios: ClienteResponse [] = [];

  visibilidadModel : boolean = false;

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.consultasService.getUsuario({id_persona : Number(localStorage.getItem('idPersona'))}).subscribe(respuesta => {
      if(respuesta.codeResponse != 200){
        alert(respuesta.messageResponse);
      }
      else{
        this.usuarios = respuesta.dataResponse!;
      }
    })
  }

  editarUsuario(id_persona : number){
    localStorage.setItem('id_persona_admin', String(id_persona));
    this.visibilidadModel = true;
    //this.gestionService.desabilitarUsuario({id_Administrador: Number(localStorage.getItem('idPersona')), id_persona: id_persona}).subscribe(respuesta => {
      //alert(respuesta.messageResponse);
      //if(respuesta.codeResponse == 200){
        //this.obtenerUsuarios();
     // }
    //});
  }

}
