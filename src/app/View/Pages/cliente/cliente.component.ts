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

  llenarItems() {
    this.translate.get('cliente').subscribe((translations: any) => {
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
    });
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
    this.router.navigateByUrl('');
  }
}
