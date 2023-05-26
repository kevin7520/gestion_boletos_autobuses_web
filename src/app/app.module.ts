import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

/* Importación de componentes creados */
import { HomeComponent } from './View/Pages/home/home.component';
import { HeaderComponent } from './View/Components/header/header.component';
import { FooterComponent } from './View/Components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
