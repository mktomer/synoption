import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import {ProductsComponent} from './products/products.component';
import {CartComponent} from './cart/cart.component';
import { ThanksComponent } from './thanks/thanks.component';


const routes: Routes = [

  {path:"product",component:ProductsComponent},
  {path:"cart",component:CartComponent},
  {path:"thanks",component:ThanksComponent},
  {path: '', redirectTo: 'product', pathMatch: 'full'},
  {path: '**', redirectTo: 'product', pathMatch: 'full'}
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ProductsComponent,CartComponent];
