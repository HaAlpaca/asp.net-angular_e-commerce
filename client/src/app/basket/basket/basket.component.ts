import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { BasketService } from '../basket.service';
import {
  faCircleMinus,
  faCirclePlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { BasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  plusIcon = faCirclePlus;
  minusIcon = faCircleMinus;
  trashIcon = faTrash;
  constructor(public basketService: BasketService) {}
  increaseQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item);
  }
  decreaseQuantity(event:{id: number,quantity: number}) {
    this.basketService.removeItemFromBasket(event.id,event.quantity);
  }
}
