import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

/* Importación de componentes creados */
import { HomeComponent } from './View/Pages/home/home.component';
import { HeaderComponent } from './View/Components/header/header.component';
import { FooterComponent } from './View/Components/footer/footer.component';

/* Importaciones de prime ng */
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

/* Componentes creados */
import { GB_dialogComponent } from './View/Components/GB_dialog/GB_dialog.component';
import { GB_buttonComponent } from './View/Components/GB_button/GB_button.component';
import { Compra_boletoComponent } from './View/Components/compra_boleto/compra_boleto.component';

/* Traducción */

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    GB_dialogComponent,
    GB_buttonComponent,
    Compra_boletoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SlickCarouselModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
