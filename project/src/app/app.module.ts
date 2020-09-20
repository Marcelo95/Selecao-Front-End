import { NgModule, LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
registerLocaleData(localePt)

import { AppComponent } from './app.component';


import { ProductComponent } from './product/product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductsService } from './products.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent, ProductComponent, ListProductsComponent],
  bootstrap:    [ AppComponent ],
  providers: [ProductsService, { provide: LOCALE_ID, 
    useValue: "pt-BR"}]
})
export class AppModule { }
