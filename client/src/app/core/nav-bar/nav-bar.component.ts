import { Component } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  faCartShopping = faCartShopping;
  constructor(public basketService: BasketService) {}
  getCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity,0);
  }
}
