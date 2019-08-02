import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { RootComponent } from './pages/root/root.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageGuard } from './guards/login-page.guard';
import { ProductsPageResolver } from './guards/products-page.resolver';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    resolve: {
      products: ProductsPageResolver
    },
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProductsListComponent },
      { path: 'product/:id', component: ProductDetailsComponent }
    ]
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginPageGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
