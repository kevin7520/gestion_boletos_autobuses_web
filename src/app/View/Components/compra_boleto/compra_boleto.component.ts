import { Component, OnInit } from '@angular/core';
import { CiudadResponseModel } from 'src/app/Models/Response/ciudades-respuesta.model';
import { CiudadModel } from 'src/app/Models/DataResponse/ciudades.model';
import { ConsultaGeneralesService } from 'src/app/Services/consulta-generales.service';
import * as lodash from 'lodash';
import { ConsultarBoletosResponse } from 'src/app/Models/DataResponse/consultarBoletosResponse.model';
import { ConsultarBoletosRequest } from 'src/app/Models/Request/consultarBoletosRequest.model';
import { ConsultarBoletosResponseModel } from 'src/app/Models/Response/consultar-boletos-respuesta.model';
import { finalize } from 'rxjs/operators';
import { MenuItem, MessageService } from 'primeng/api';
import { faCouch } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-compra_boleto',
  templateUrl: './compra_boleto.component.html'
})
export class Compra_boletoComponent implements OnInit {

  constructor(private _consultasGeneralesService : ConsultaGeneralesService, private messageService: MessageService) { }

  /* ICONOS */
  icon_bus_asiento = faCouch;
  /* */


  /*Variables prueba*/
    asientos : any[] = [
      {asiento: 'A1'},
      {asiento: 'A2'},
      {asiento: 'A3'},
      {asiento: 'A4'},
      {asiento: 'A5'},
      {asiento: 'A6'},
      {asiento: 'A7'},
      {asiento: 'A8'},
      {asiento: 'A9'},
      {asiento: 'A10'},
      {asiento: 'A11'},
      {asiento: 'A12'},
      {asiento: 'A13'},
      {asiento: 'A14'},
      {asiento: 'A15'},
      {asiento: 'A16'},
      {asiento: 'A17'},
      {asiento: 'A18'},
      {asiento: 'A19'},
      {asiento: 'A20'},
      {asiento: 'B1'},
      {asiento: 'B2'},
      {asiento: 'B3'},
      {asiento: 'B4'},
      {asiento: 'B5'},
      {asiento: 'B6'},
      {asiento: 'B7'},
      {asiento: 'B8'},
      {asiento: 'B9'},
      {asiento: 'B10'},
      {asiento: 'B11'},
      {asiento: 'B12'},
      {asiento: 'B13'},
      {asiento: 'B14'},
      {asiento: 'B15'},
      {asiento: 'B16'},
      {asiento: 'B17'},
      {asiento: 'B18'},
      {asiento: 'B19'},
      {asiento: 'B20'},
      {asiento: 'C1'},
      {asiento: 'C2'},
      {asiento: 'C3'},
      {asiento: 'C4'},
      {asiento: 'C5'},
    ]
  /**/
  ciudadesPartidaData:CiudadModel[] = [];
  ciudadesLlegadaData:CiudadModel[] = [];
  ciudadPartida!:CiudadModel;
  ciudadLlegada!:CiudadModel;
  boletos : ConsultarBoletosResponse[] = [];
  pasosCompraBoleto!: MenuItem[];
  id : number = 0;
  id_boleto : number = 0;
  spinner : boolean = false;
  ngOnInit() {
     this.pasosCompraBoleto = [{label: 'X Selecionar boleto',},{label: 'X Seleccionar asiento',},{label: 'X Información personal',},{label: 'X Metodo Pago',}];
    setTimeout(() => {
      this.obtenerCiudades();
    }, 500);
  }

  obtenerCiudades(){
    this._consultasGeneralesService.getCiudades().subscribe((ciudades : CiudadResponseModel)=>{
      if(ciudades.codeResponse==200){
        this.ciudadesPartidaData = lodash.cloneDeep(ciudades.dataResponse!);
        this.ciudadesLlegadaData = lodash.cloneDeep(ciudades.dataResponse!);
        this.ciudadPartida = this.ciudadesPartidaData[0];
        this.eliminarCiudadSeleccionada(this.ciudadPartida.id_ciudad);
        this.obtenerBoletos();
      }
      else{
        console.log(ciudades.messageResponse);
      }
    })
  }

  obtenerBoletos(){
    let boletosRequest : ConsultarBoletosRequest = {
      id_ciudadDestino : this.ciudadLlegada.id_ciudad,
      id_ciudadPartida : this.ciudadPartida.id_ciudad
    }
    this._consultasGeneralesService.getBoletos(boletosRequest).pipe(
      finalize(() => {
        this.spinner = false;
      })
    ).subscribe((boletosRequest : ConsultarBoletosResponseModel)=>{
      if(boletosRequest.codeResponse==200){
           this.boletos = boletosRequest.dataResponse!;  
           this.boletos = lodash.sortBy(this.boletos, [
            boleto => new Date(boleto.fecha_salida),
            boleto => this.obtenerHora(boleto.hora_salida)
          ]);
      }
      else{
        this.messageService.add({key: 'comprar-boleto',severity:'error', detail: boletosRequest.messageResponse, icon: 'pi-cog'});
        this.boletos = [];
        console.log(boletosRequest.messageResponse);
      }
    });
  }

  eliminarCiudadSeleccionada(idCiudad : number){
    lodash.remove(this.ciudadesLlegadaData, (ciudad) => ciudad.id_ciudad == idCiudad);
    this.ciudadLlegada = this.ciudadesLlegadaData[0];
  }

  /* Eventos inputs */

  cambioCiudadPartida(ciudad : any){
    this.spinner  = true;
    this.ciudadesLlegadaData = lodash.cloneDeep(this.ciudadesPartidaData);
    this.eliminarCiudadSeleccionada(ciudad.value.id_ciudad);
    setTimeout(() => {
      this.obtenerBoletos();
    }, 500);
  }

  cambioCiudadDestino(ciudad : any){
    this.spinner  = true;
    setTimeout(() => {
      this.obtenerBoletos();
    }, 500);
  }

  obtenerHora(hora: string): Date {
    const partes = hora.split(':');
    const horaDate = new Date();
    horaDate.setHours(Number(partes[0]));
    horaDate.setMinutes(Number(partes[1]));
    horaDate.setSeconds(Number(partes[2]));
    return horaDate;
  }

  seleccionarBoleto(id_boleto : number){
    this.id_boleto = id_boleto;
    this.id = 1;
  }

}
