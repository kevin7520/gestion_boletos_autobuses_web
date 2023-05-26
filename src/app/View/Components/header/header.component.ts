import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {


  @Output() section  = new EventEmitter(); 

  constructor() { }

  ngOnInit() {
  }

  cambioSection(section : string){
    this.section.emit(section);
  }

}
