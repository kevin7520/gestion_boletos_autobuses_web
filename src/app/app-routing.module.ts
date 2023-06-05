import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './View/Pages/home/home.component';
import { Compra_boletoComponent } from './View/Components/compra_boleto/compra_boleto.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'comprar-boleto-home', component: Compra_boletoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
