import { Component, OnInit } from '@angular/core';
import { CiudadModel } from 'src/app/Models/ciudades.model';

@Component({
  selector: 'app-compra_boleto',
  templateUrl: './compra_boleto.component.html'
})
export class Compra_boletoComponent implements OnInit {

  constructor() { }

  ciudades:CiudadModel[] = [{name: 'Guayqil',code: '1'},{name: 'Quito',code: '2'}];
  ciudadPartida:CiudadModel = {name: 'Guayqil',code: '1'};
  ngOnInit() {
  }

}
