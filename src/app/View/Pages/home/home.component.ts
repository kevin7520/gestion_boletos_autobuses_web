import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit {

  constructor(private _activateRoute: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    
  }

  ngAfterViewInit() {
    this.cambiarSection(String(this._activateRoute.snapshot.queryParamMap.get('id')));
  }

  cambiarSection(section : string){
    console.log(section);
    const sectionTnp = document.getElementById(section);
    if (sectionTnp) {
      let offset = sectionTnp.offsetTop - 60;
      if(section != 'inicio'){
        offset = offset-50;
      }
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }
  
  visibleModal = false;
  rutaImagen : string = '';
  showDialog(rutaImagen : string) {
    this.rutaImagen = rutaImagen;
    this.visibleModal = true;
  }

  cambiarPantalla(){
    this.router.navigate(['/comprar-boleto-home']);
  }

}
