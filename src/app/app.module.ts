import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducers, metaReducers } from './reducers';
import { LoginComponent } from './pages/login/login.component';
import { RootComponent } from './pages/root/root.component';

import { LoginEffects } from './reducers/login/login.effects';
import { ProductsEffects } from './reducers/products/products.effects';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { ProductDetailsModule } from './pages/product-details/product-details.module';
import { ProductsListModule } from './pages/products-list/products-list.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RootComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([LoginEffects, ProductsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    SharedModule,
    ProductsListModule,
    ProductDetailsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
