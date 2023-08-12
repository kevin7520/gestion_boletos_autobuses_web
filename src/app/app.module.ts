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
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StepsModule } from 'primeng/steps';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';


/* Componentes creados */
import { GB_dialogComponent } from './View/Components/GB_dialog/GB_dialog.component';
import { GB_buttonComponent } from './View/Components/GB_button/GB_button.component';
import { Compra_boletoComponent } from './View/Components/compra_boleto/compra_boleto.component';
import { ClienteComponent } from './View/Pages/cliente/cliente.component';

/* Traducción */

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { HoraPipe } from './View/Pipes/hora.pipe';

/* Font Awesome */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputTextModule } from 'primeng/inputtext';
import { Editar_PerfilComponent } from './View/Pages/cliente/Editar_Perfil/Editar_Perfil.component';
import { EliminarUsuariosComponent } from './View/Pages/Administrador/eliminar-usuarios/eliminar-usuarios.component';


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
    Compra_boletoComponent,
    ClienteComponent,
    Editar_PerfilComponent,
    EliminarUsuariosComponent,
    HoraPipe
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
    ToastModule,
    DividerModule,
    MenuModule,
    ProgressSpinnerModule,
    StepsModule,
    FontAwesomeModule,
    RadioButtonModule,
    InputMaskModule,
    InputTextModule,
    TableModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
