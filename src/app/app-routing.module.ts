import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './View/Pages/home/home.component';
import { Compra_boletoComponent } from './View/Components/compra_boleto/compra_boleto.component';
import { ClienteComponent } from './View/Pages/cliente/cliente.component';
import { Editar_PerfilComponent } from './View/Pages/cliente/Editar_Perfil/Editar_Perfil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'comprar-boleto-home', component: Compra_boletoComponent },
  { path: 'cliente', component: ClienteComponent, 
    children: [
      { path: '', component: Compra_boletoComponent },
      { path: 'editar-perfil', component: Editar_PerfilComponent}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
