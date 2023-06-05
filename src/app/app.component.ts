import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gestion_boletos_autobuses_web';
  constructor(private translateService: TranslateService) {
    // Establecer el idioma por defecto
    this.translateService.setDefaultLang('es');
    // Detectar el idioma del navegador
    const browserLang = this.translateService.getBrowserLang();
    const langToUse = browserLang ? browserLang.match(/en|es/) ? browserLang : 'es' : 'es';
    this.translateService.use(langToUse);
  }

  cambiarIdioma(idioma: string) {
    this.translateService.use(idioma);
  }
}
