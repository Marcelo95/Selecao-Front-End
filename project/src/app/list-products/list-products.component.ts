import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ProductsService } from "../products.service";
import { Product } from "../product/product";
import { Alert } from "../alert";

@Component({
  selector: "list-products",
  templateUrl: "./list-products.component.html",
  styleUrls: ["./list-products.component.css"]
})
export class ListProductsComponent implements OnInit {
  @Output() alertEvents = new EventEmitter<Alert>();
  @Output() removeProductsEvents = new EventEmitter<number>();
  @Output() showMenuEvents = new EventEmitter<string>();
  @Input() products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {}

  deleteProduct(id: number, name: string) {
    if (confirm("Deseja realmente excluir esse produto?")) {
      this.productsService.deleteProduct(id).subscribe(
        async r => {
          // await this.loadProducts();
          this.removeProductsEvents.emit(id);
          this.alertEvents.emit({
            type: "alert-success",
            name: "Tudo certo!",
            description: `O produto "${name.toLocaleUpperCase()}" foi deletado com sucesso!`
          });

          //console.log(r);
        },
        error => {
          this.removeProductsEvents.emit(id);

          if (error.status !== 200) {
            this.alertEvents.emit({
              type: "alert-danger",
              name: "ooow!",
              description:
                "Ocorreu algum erro na API ao tentar excluir esse produto, mas vou deletar por aqui!"
            });
          }
        }
      );
    }
  }

  showMenu(menu: string) {
    this.showMenuEvents.emit(menu);
  }
}
