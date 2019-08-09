import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { RootComponent } from './pages/root/root.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageGuard } from './guards/login-page.guard';
import { ProductsPageResolver } from './guards/products-page.resolver';
import { ProductDetailsResolver } from './guards/product-details.resolver';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LOGIN, PRODUCT, EDIT_PRODUCT } from './constants/routes';
import { EditProductModalComponent } from './pages/product-details/edit-product-modal/edit-product-modal.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
      {
        path: PRODUCT,
        component: ProductDetailsComponent,
        resolve: { product: ProductDetailsResolver },
        children: [
          { path: EDIT_PRODUCT, component: EditProductModalComponent }
        ]
      }
    ]
  },
  { path: LOGIN, component: LoginComponent, canActivate: [LoginPageGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
