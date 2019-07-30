import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { RootComponent } from './pages/root/root.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageGuard } from './guards/login-page.guard';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      { path: '', component: ProductListComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginPageGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
