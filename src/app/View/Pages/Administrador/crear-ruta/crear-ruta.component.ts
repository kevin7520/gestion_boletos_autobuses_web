import { Component, OnInit } from '@angular/core';
import { CrearViajeRequest } from 'src/app/Models/Request/crearViajeRequest';
import { ConsultaGeneralesService } from 'src/app/Services/consulta-generales.service';
import { GestionTablasGeneralesService } from 'src/app/Services/gestion-tablas-generales.service';

@Component({
  selector: 'app-crear-ruta',
  templateUrl: './crear-ruta.component.html',
  styleUrls: ['./crear-ruta.component.Scss']
})
export class CrearRutaComponent implements OnInit {

  constructor(private consultaGenerales : ConsultaGeneralesService, private gestionTablas : GestionTablasGeneralesService) { }

  buses : any[] = [];

  rutas : any[] = [];

  busElegido : any;
  rutaElegido : any;
  fecha_salida!: Date;
  hora_salida!: Date;

  viaje : CrearViajeRequest = {
    id_bus : 0,
    id_ruta : 0,
    fecha_salidar : '',
    hora_salidar : '',
    precio : 0
  };
  ngOnInit() {
    this.obtenerBuses();
    this.obtenerRutas();
  }

  obtenerBuses(){
    this.consultaGenerales.getBuses().subscribe(respuesta => {
      if(respuesta.codeResponse != 200){
        alert(respuesta.messageResponse)
      }
      else{
        respuesta.dataResponse?.forEach(bus =>{
          this.buses.push({name: bus.placa, code : bus.id_bus});
        });
        this.busElegido = this.buses[0];
      }
    });
  }

  obtenerRutas(){
    this.consultaGenerales.getRutas().subscribe(respuesta => {
      if(respuesta.codeResponse != 200){
        alert(respuesta.messageResponse)
      }
      else{
        respuesta.dataResponse?.forEach((ruta : any) =>{
          this.rutas.push({name: ruta.ciudad_destino + ' a ' + ruta.ciudad_salida, code : ruta.id_ruta});
        });
        this.rutaElegido = this.rutas[0];
      }
    });
  }

  guardarViaje(){
    this.viaje.id_bus = this.busElegido.code;
    this.viaje.id_ruta = this.rutaElegido.code;
    const anio = this.fecha_salida.getFullYear();
    const mes = this.fecha_salida.getMonth() + 1; 
    const dia = this.fecha_salida.getDate();
    this.viaje.fecha_salidar  = `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
    
    const hora = this.hora_salida.getHours();
    const minutos = this.hora_salida.getMinutes();
    const segundos = 0;

    this.viaje.hora_salidar = `${hora < 10 ? '0' : ''} ${hora}:${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    this.gestionTablas.crearViaje({id_Administrador: Number(localStorage.getItem('idPersona')), viaje : this.viaje}).subscribe(respuesta=>{
      alert(respuesta.messageResponse);
      window.location.reload();
    });
  }

}
