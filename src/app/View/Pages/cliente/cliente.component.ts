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
    switch(localStorage.getItem('rol')){
      case "4": 
        this.llenarItemsCliente();
        break;
      case "3":
        this.llenarItemsChofer();
        break;
      case "2":
        this.llenarItemsVendedor();
        break;
      case "1":
        this.llenarItemsAdministrador();
        break;
    }
  }

  llenarItemsCliente(){
    this.items = [
      {
        label: 'X Opciones',
        icon: 'pi pi-cog',
        items: [
            {
                label: 'X Comprar boletos',
                icon: 'pi pi-refresh',
                command: () => {
                  this.router.navigateByUrl('/usuario');
                }
            },
            {
                label: 'X Historial de compras',
                icon: 'pi pi-shopping-cart',
                command: () => {
                  this.router.navigateByUrl('/usuario/editar-perfil');
                }
            },
            {
              label: 'X Editar perfil',
              icon: 'pi pi-user-edit',
              command: () => {
                this.router.navigateByUrl('/usuario/editar-perfil');
              }
            },
            {
              label: 'X Cerrar Sesión',
              icon: 'pi pi-sign-out',
              command: () => {
                this.cerrarSesion();
              }
            }
        ]
      }
    ];
  }

  llenarItemsChofer(){

  }

  llenarItemsVendedor(){

  }

  llenarItemsAdministrador(){
    this.items = [
      {
        label: 'X Opciones',
        icon: 'pi pi-cog',
        items: [
            {
                label: 'X Crear usuario',
                icon: 'pi pi-refresh',
                command: () => {
                  this.router.navigateByUrl('/administrador');
                }
            },
            {
                label: 'X Eliminar usuario',
                icon: 'pi pi-shopping-cart',
                command: () => {
                  this.router.navigateByUrl('/administrador/eliminar-usuario');
                }
            },
            {
              label: 'X Editar usuario',
              icon: 'pi pi-user-edit',
              command: () => {
                this.router.navigateByUrl('/administrador/editar-usuario');
              }
            },
            {
              label: 'X Crear ruta',
              icon: 'pi pi-user-edit',
              command: () => {
                this.router.navigateByUrl('/cliente/editar-perfil');
              }
            },
            {
              label: 'X Cerrar Sesión',
              icon: 'pi pi-sign-out',
              command: () => {
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
