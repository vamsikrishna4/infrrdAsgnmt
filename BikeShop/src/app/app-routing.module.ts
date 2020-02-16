import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryDisplayComponent } from './inventory-display/inventory-display.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: 'home',
    component: InventoryDisplayComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
