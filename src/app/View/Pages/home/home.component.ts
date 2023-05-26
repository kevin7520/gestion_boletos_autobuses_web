import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cambiarSection(section : any){
    console.log(section);
    const sectionTnp = document.getElementById(section);
    if (sectionTnp) {
      const offset = sectionTnp.offsetTop - 60;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

}
