import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  plusIcon = faCirclePlus;
  minusIcon = faCircleMinus;

  quantity = 1;
  quantityInBasket = 0;
  product?: Product;
  constructor(
    private shopService: ShopService,
    private activeRoute: ActivatedRoute,
    private bcSevice: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.bcSevice.set('@productDetails', ' ');
  }
  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id)
      this.shopService.getProduct(+id).subscribe({
        next: (res) => {
          (this.product = res),
            this.bcSevice.set('@productDetails', this.product.name);
          this.basketService.basketSource$.pipe(take(1)).subscribe({
            next: (basket) => {
              const item = basket?.items.find((x) => x.id === +id);
              if (item) {
                this.quantity = item.quantity;
                this.quantityInBasket = item.quantity;
              }
            },
          });
        },
        error: (err) => console.log(err),
      });
  }
  increasementQuantity() {
    this.quantity++;
  }
  decreasementQuantity() {
    if (this.quantity >= 0) {
      this.quantity--;
    }
  }
  updateBasket() {
    if (this.product) {
      if (this.quantity > this.quantityInBasket) {
        const itemToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket += itemToAdd;
        this.basketService.addItemToBasket(this.product, itemToAdd);
      } else {
        const itemToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemToRemove;
        this.basketService.removeItemFromBasket(this.product.id, itemToRemove);
      }
    }
  }

  get ButtonText() {
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket';
  }

}
