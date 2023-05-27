import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
  visible = false;
  showDialog() {
    this.visible = true;
}

}
