import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { PhoneInternationalPipe } from './phone-international.pipe';
import { CatalogComponent } from './catalog/catalog.component';

import { NgxsModule } from '@ngxs/store';
import { CartComponent } from './cart/cart.component';
import {ProductState} from "../../shared/states/product-state";
import { ApiHttpInterceptor } from './interceptor';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "./auth-guard";

const appRoutes: Routes = [
  { path: '', redirectTo: '/client', pathMatch: 'full' },
  { path: 'client', component: FormComponent},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  { path: 'catalog', component: CatalogComponent, canActivate: [AuthGuardService]}
]

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HeaderComponent,
    FooterComponent,
    PhoneInternationalPipe,
    CatalogComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([ProductState]),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})

export class AppModule { }
