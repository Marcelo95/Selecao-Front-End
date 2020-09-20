import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ProductsService } from "../products.service";
import { Product } from "../product/product";
import { Alert } from "../alert";
@Component({
  selector: "product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  newProduct: Product = { id: null, name: null, price: null, sku: null };

  @Output() alertEvents = new EventEmitter<Alert>();
  @Output() addProductEvents = new EventEmitter<Product>();
  @Output() showMenuEvents = new EventEmitter<string>();
  @Input() products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    if (f.valid) {
      this.productsService.addProduct(f.value).subscribe(
        async r => {
          this.alertEvents.emit({
            type: "alert-success",
            name: "Tudo certo!",
            description: `O produto "${f.value.name.toLocaleUpperCase()}" foi adicionado com sucesso!`
          });

          f.value.id = -1; // set id temporary

          this.addProductEvents.emit(f.value);
          this.showMenuEvents.emit("list");

          // console.log(r);
        },
        error => {
          // console.log(error);
          if (error.status !== 200) {
            this.alertEvents.emit({
              type: "alert-success",
              name: "Tudo certo!",
              description: `O produto "${f.value.name.toLocaleUpperCase()}" foi adicionado com sucesso!`
            });

            f.value.id = -1; // set id temporary

            this.addProductEvents.emit(f.value);
            this.newProduct = { id: null, name: null, price: null, sku: null };
            this.showMenuEvents.emit("list");
          }
        }
      );
    }
  }
}
