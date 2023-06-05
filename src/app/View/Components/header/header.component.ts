import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CredencialesModel } from 'src/app/Models/credenciales.model';

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

  constructor(private _router: Router) { }

  idioma_array!: Idioma[];

  selectedIdioma: Idioma = { name: 'Español', code: 'es' };

  credenciales : CredencialesModel = {
    correo : '',
    contrasena : '',
  };

  ngOnInit() {
      this.idioma_array = [
          { name: 'Español', code: 'es' },
          { name: 'English', code: 'en' },
      ];
  }

  cambioIdioma(section : any){
    console.log(section);
    this.idioma.emit(section.value.code);
  }

  cambioSection(section : string){
    this._router.navigate([''], { queryParams: { id:  section} });
  }

  inicioSeccion : boolean = false;

  abrirModal(){
    this.inicioSeccion = true;
  }

}
