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
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { RootComponent } from './pages/root/root.component';

import { LoginEffects } from './reducers/login/login.effects';
import { ProductsEffects } from './reducers/products/products.effects';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { environment } from '../environments/environment';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SearchComponent } from './pages/products-list/search/search.component';
import { FiltersComponent } from './pages/products-list/filters/filters.component';
import { AvailabilityFilterComponent } from './pages/products-list/filters/availability-filter/availability-filter.component';
import { GenderFilterComponent } from './pages/products-list/filters/gender-filter/gender-filter.component';
import { CategoriesFilterComponent } from './pages/products-list/filters/categories-filter/categories-filter.component';
import { RatingFilterComponent } from './pages/products-list/filters/rating-filter/rating-filter.component';
import { PriceFilterComponent } from './pages/products-list/filters/price-filter/price-filter.component';
import { BuyProductModalComponent } from './pages/product-details/buy-product-modal/buy-product-modal.component';
import { SharedModule } from './shared/shared.module';
import { EditProductModalComponent } from './pages/product-details/edit-product-modal/edit-product-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsListComponent,
    RootComponent,
    ProductDetailsComponent,
    SearchComponent,
    FiltersComponent,
    AvailabilityFilterComponent,
    GenderFilterComponent,
    CategoriesFilterComponent,
    RatingFilterComponent,
    PriceFilterComponent,
    BuyProductModalComponent,
    EditProductModalComponent
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
