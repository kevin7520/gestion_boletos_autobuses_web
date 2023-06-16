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
import { asientosSeleccionado} from 'src/app/Models/Request/boletoSeleccionadoRequest';
import { BuscarAsientosDataResponse } from 'src/app/Models/DataResponse/consultarAsientoResponse';
import { BuscarAsientosRequest } from 'src/app/Models/Request/buscarAsientoRequest';



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
    asientos : BuscarAsientosDataResponse[] = []
    ingredient: string='';
    identificacion: string='';
    /**/
  iconoAsientoDisponible: string = '../../../../assets/Images/icons/asiento-libre.svg';
  iconoAsientoOcupado: string = '../../../../assets/Images/icons/asiento-ocupado.svg';
  iconoAsientoSeleccionado: string = '../../../../assets/Images/icons/asiento-seleccionado.svg';
  asientosSeleccionado : asientosSeleccionado[] = [];
  ciudadesPartidaData:CiudadModel[] = [];
  ciudadesLlegadaData:CiudadModel[] = [];
  ciudadPartida:CiudadModel={id_ciudad : 0, ciudad:'Guayaquil'};
  ciudadLlegada:CiudadModel={id_ciudad : 0, ciudad:'Quito'};
  boletos : ConsultarBoletosResponse[] = [];
  boletoSeleccionado! : ConsultarBoletosResponse;
  pasosCompraBoleto!: MenuItem[];
  id : number = 0;
  id_boleto : number = 0;
  spinner : boolean = true;
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
    this.spinner = true;
    this.id_boleto = id_boleto;
    this.boletos.forEach((boleto)=>{
      if(boleto.id_boleto == id_boleto){
        this.boletoSeleccionado = lodash.cloneDeep(boleto);
      }
    });
    setTimeout(() => {
      this.buscarAsientos(id_boleto);
      this.id = 1;
    }, 500);
  }

  buscarAsientos(id_boleto : number){
    let asientoRequestTemp : BuscarAsientosRequest = {
      id_boleto: id_boleto,
    }
    this._consultasGeneralesService.getAsientos(asientoRequestTemp).pipe(
        finalize(() => {
          this.spinner = false;
        })
      ).subscribe((respuesta=>{
      if(respuesta.codeResponse==200){
        this.asientos = lodash.cloneDeep(respuesta.dataResponse)!;
      }
      else{
        this.messageService.add({key: 'comprar-boleto',severity:'error', detail: respuesta.messageResponse, icon: 'pi-cog'});
      }
    }));
  }

  seleccionarAsiento(id_asiento : number){
    this.asientos.forEach((asiento,index)=>{
      if(asiento.id_asiento == id_asiento && asiento.disponible){
        if(!asiento.seleccionado){
          this.asientos[index].seleccionado = true;
          let asientoTemp : asientosSeleccionado = {
            id_asiento : id_asiento,
            tipo_Identificacion : 'C',
            identificacion  : '',
            nombre_cliente  : '',
            celular_cliente : '',
            correo_cliente  : ''
          }
          this.asientosSeleccionado.push(asientoTemp);
        }
        else{
          this.asientos[index].seleccionado = false;
          this.asientosSeleccionado = lodash.remove(this.asientosSeleccionado, (asientoSeleccionado) => asientoSeleccionado.id_asiento != id_asiento);
        }
      }
    });
  }

  eliminarAsiento(id_asiento : number){
    this.asientos.forEach((asiento,index)=>{
      if(asiento.id_asiento == id_asiento){
        this.asientos[index].seleccionado = false;
        this.asientosSeleccionado = lodash.remove(this.asientosSeleccionado, (asientoSeleccionado) => asientoSeleccionado.id_asiento != id_asiento);
      }
    });
  }

  encontrarNombreAsiento(id_asiento : number) : string{
    let asientoTemp : string = '';
    this.asientos.forEach((asiento)=>{
      if(asiento.id_asiento == id_asiento){
        asientoTemp = asiento.asiento;
      }
    });
    return asientoTemp;
  }

  cantidadAsientoDisponible() : number{
    let asientosDisponibles : number = 0
    asientosDisponibles = lodash.size(lodash.filter(this.asientos, (asiento) => asiento.disponible && !asiento.seleccionado));
    return asientosDisponibles;
  }

}
