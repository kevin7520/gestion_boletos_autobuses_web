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
import { asientosSeleccionado} from 'src/app/Models/Request/CompraBoleto/boletoSeleccionadoRequest';
import { BuscarAsientosDataResponse } from 'src/app/Models/DataResponse/consultarAsientoResponse';
import { BuscarAsientosRequest } from 'src/app/Models/Request/buscarAsientoRequest';
import { AsientosAccionesRequest } from 'src/app/Models/Request/asientosAccionesRequest';
import { GestionTablasGeneralesService } from 'src/app/Services/gestion-tablas-generales.service';
import { CompraBoletoFinalRequest } from 'src/app/Models/Request/CompraBoleto/compraBoletoFinalRequest';
import { Router } from '@angular/router';



@Component({
  selector: 'app-compra_boleto',
  templateUrl: './compra_boleto.component.html'
})
export class Compra_boletoComponent implements OnInit {

  constructor(
      private router : Router,
      private _consultasGeneralesService : ConsultaGeneralesService, 
      private _gestionTablasGeneralesService : GestionTablasGeneralesService,
      private messageService: MessageService) 
  { }

  /* ICONOS */
  icon_bus_asiento = faCouch;
  /* */


  /*Variables prueba*/
    asientos : BuscarAsientosDataResponse[] = []
    ingredient: string='';
    tipoIdentificacion : string = 'C';
    identificacion: string='';
    value : string = '';
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

  compraBoleto : CompraBoletoFinalRequest = {
    id_boleto : String(this.id_boleto),
    formaPago : null,
    ClienteBoletoResponse : null,
    asientosSeleccionado : this.asientosSeleccionado
  }
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
        boletosRequest.dataResponse?.forEach((resultado,index)=>{
          boletosRequest.dataResponse![index].fecha_salida = this.swapDayMonth(boletosRequest.dataResponse![index].fecha_salida);
        });
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

  swapDayMonth(dateString: string): string {
    const [datePart, timePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("/");
    return `${day}/${month}/${year} ${timePart}`;
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
    this.compraBoleto.id_boleto = String(id_boleto);
    this.boletos.forEach((boleto)=>{
      if(boleto.id_boleto == id_boleto){
        this.boletoSeleccionado = lodash.cloneDeep(boleto);
      }
    });
    setTimeout(() => {
      this.buscarAsientos(id_boleto);
      this.id = 1;
    }, 500);
    console.log(this.boletoSeleccionado);
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
          let id_asientoTemp :  AsientosAccionesRequest = {
            id_asiento : id_asiento
          }
          this._gestionTablasGeneralesService.seleccionarAsiento(id_asientoTemp).subscribe((respuesta)=>{
            if(respuesta.codeResponse == 200){
              this.asientos[index].seleccionado = true;
              let asientoTemp : asientosSeleccionado = {
                id_asiento : id_asiento,
                cliente : { 
                  tipo_Identificacion : 'C',
                  identificacion  : '',
                  nombre_cliente  : '',
                  celular_cliente : '',
                  correo_cliente  : ''
                }
              }
              this.asientosSeleccionado.push(asientoTemp);
              this.messageService.add({key: 'comprar-boleto',severity:'success', detail: respuesta.messageResponse, icon: 'pi-cog'});
            }
            else{
              this.messageService.add({key: 'comprar-boleto',severity:'error', detail: respuesta.messageResponse, icon: 'pi-cog'});
            }
          });
        }
        else{
          let id_asientoTemp :  AsientosAccionesRequest = {
            id_asiento : id_asiento
          }
          this._gestionTablasGeneralesService.recuperarAsiento(id_asientoTemp).subscribe((respuesta)=>{
            if(respuesta.codeResponse == 200){
              this.asientos[index].seleccionado = false;
              this.asientosSeleccionado = lodash.remove(this.asientosSeleccionado, (asientoSeleccionado) => asientoSeleccionado.id_asiento != id_asiento);    
              this.messageService.add({key: 'comprar-boleto',severity:'success', detail: respuesta.messageResponse, icon: 'pi-cog'});
            }
            else{
              this.messageService.add({key: 'comprar-boleto',severity:'error', detail: respuesta.messageResponse, icon: 'pi-cog'});
            }
          });
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

  guardarInformacionBoleto(){
    this.compraBoleto.ClienteBoletoResponse = {
      nombre_cliente : '',
      tipo_Identificacion : 'C',
      identificacion : '',
      celular_cliente : '',
      correo_cliente : ''
    }
    this.compraBoleto.formaPago = {
      tipoFormaPago : 'C',
      nombre : '',
      numero_tarjeta : '',
      fecha_expiracion : '',
      codigo_tarjeta : ''
    }
    this.id = 2;
    console.log(this.asientosSeleccionado);
  }
  pagarBoleto(){
    console.log(this.compraBoleto);
    this.messageService.add({key: 'comprar-boleto',severity:'success', detail: 'Compra exitosa', icon: 'pi-cog'});
    this.spinner = true;
    setTimeout(() => {
      this.router.navigateByUrl('');
    }, 1000);
  }

  bloquearLetras(event: KeyboardEvent) {
    const pattern = /[0-9]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
    }
  }

  bloquearNumeros(event: KeyboardEvent) { 
    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
    }
  }
  

}
