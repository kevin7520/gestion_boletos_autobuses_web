import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem} from 'primeng/api';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {
  items!: MenuItem[];
  constructor(
    private router : Router
  ) { }

  ngOnInit() {
    this.llenarItems();
  }

  llenarItems(){
    this.items = [
      {
        label: 'X Opciones',
        icon: 'pi pi-cog',
        items: [
            {
                label: 'X Comprar boletos',
                icon: 'pi pi-refresh',
                command: () => {
                    console.log("Actualizo");
                }
            },
            {
                label: 'X Historial de compras',
                icon: 'pi pi-shopping-cart',
                command: () => {
                  console.log("Elimino");
                }
            },
            {
              label: 'X Editar perfil',
              icon: 'pi pi-user-edit',
              command: () => {
                this.router.navigateByUrl('/cliente/editar-perfil');
              }
            },
            {
              label: 'X Cerrar Sesión',
              icon: 'pi pi-sign-out',
              command: () => {
                console.log("Elimino");
                this.cerrarSesion();
              }
            }
        ]
      }
    ];
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigateByUrl('').then(() => {
      // Después de que se complete la navegación, recargar la página completa
      window.location.reload();
    });
  }
}
