import { Component, OnInit } from "@angular/core";
import { Alert } from "./alert";
import { Product } from "./product/product";
import { ProductsService } from "./products.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  menu: string = "list";
  alerts: Alert[] = [];
  products: Product[];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    await this.productsService
      .getProducts()
      .subscribe(r => (this.products = r));
  }

  addAlert(alert: Alert) {
    this.alerts.push(alert);

    setTimeout(() => {
      this.alerts = this.alerts.splice(1);
    }, 10000);
  }

  addProduct(prod: Product) {
    this.products = this.products.filter(p => p.id !== prod.id);

    prod.id = this.products[this.products.length - 1].id + 1;

    this.products.push(prod);
  }

  deleteProduct(id: number) {
    console.log(id);
    this.products = this.products.filter(p => p.id !== id);
  }

  showMenu(menu : string){
    this.menu = menu;
  }
}
