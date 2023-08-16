import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MenuItem} from 'primeng/api';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {
  items!: MenuItem[];
  constructor(
    private translate : TranslateService,
    private router : Router
  ) { }

  ngOnInit() {
    this.llenarItems();
    this.subscribeToLanguageChange();

  }

  llenarItemsCliente(translations : any){
    this.items = [
      {
        label: translations.opciones,
        icon: 'pi pi-cog',
        items: [
          {
            label: translations.comprar_boletos,
            icon: 'pi pi-refresh',
          },
          {
            label: translations.historial_compras,
            icon: 'pi pi-shopping-cart',
          },
          {
            label: translations.editar_perfil,
            icon: 'pi pi-user-edit',
            command: () => {
              this.router.navigateByUrl('/usuario/editar-perfil');
            }
          },
          {
            label: translations.cerrar_sesion,
            icon: 'pi pi-sign-out',
            command: () => {
              this.cerrarSesion();
            }
          }
        ]
      }
    ];
  }

  llenarItems(){
    this.translate.get('cliente').subscribe((translations: any) => {
      switch(localStorage.getItem('rol')){
        case "4": 
          this.llenarItemsCliente(translations);
          break;
        case "3":
          this.llenarItemsChofer(translations);
          break;
        case "2":
          this.llenarItemsVendedor(translations);
          break;
        case "1":
          this.llenarItemsAdministrador(translations);
          break;
      }
    })
  }

  llenarItemsChofer(translations : any){

  }

  llenarItemsVendedor(translations : any){
    this.items = [
      {
        label: 'X Opciones',
        icon: 'pi pi-cog',
        items: [
            {
                label: 'X Vender Boleto',
                icon: 'pi pi-refresh',
                command: () => {
                  this.router.navigateByUrl('/vendedor');
                }
            },
            {
              label: 'X Editar usuario',
              icon: 'pi pi-user-edit',
              command: () => {
                this.router.navigateByUrl('/vendedor/editar-usuario');
              }
            },
            {
              label: translations.cerrar_sesion,
              icon: 'pi pi-sign-out',
              command: () => {
                this.cerrarSesion();
              }
            }
          ]
      }
    ];
  }

  llenarItemsAdministrador(translations : any){
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
                this.router.navigateByUrl('/administrador/crear-ruta');
              }
            },
            {
              label: translations.cerrar_sesion,
              icon: 'pi pi-sign-out',
              command: () => {
                this.cerrarSesion();
              }
            }
          ]
      }
    ];
  }
  
  subscribeToLanguageChange() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log(event)
      // Cuando se produce un cambio en el idioma, volvemos a llenar los items
      // para que las etiquetas se actualicen con las nuevas traducciones.
      this.llenarItems();
    });
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigateByUrl('').then(() => {
      // Después de que se complete la navegación, recargar la página completa
      window.location.reload();
    });
  }
}
