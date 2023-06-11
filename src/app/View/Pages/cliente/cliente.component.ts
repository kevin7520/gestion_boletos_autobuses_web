import { Component, OnInit } from '@angular/core';
import { MenuItem} from 'primeng/api';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {
  items!: MenuItem[];
  constructor() { }

  ngOnInit() {
    this.llenarItems();
  }

  llenarItems(){
    this.items = [
      {
        label: 'Options',
        items: [
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    console.log("Actualizo");
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => {
                  console.log("Elimino");
                }
            }
        ]
      },
      {
        label: 'Navigate',
        items: [
            {
                label: 'Angular',
                icon: 'pi pi-external-link',
                url: 'http://angular.io'
            },
            {
                label: 'Router',
                icon: 'pi pi-upload',
                routerLink: '/fileupload'
            }
        ]
      }
    ];
  }

}
