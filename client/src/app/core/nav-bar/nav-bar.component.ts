import { Component, OnInit } from '@angular/core';
import {
  faCartShopping,
  faGear,
  faSliders,
} from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  role: string = '';
  faCartShopping = faCartShopping;
  faCartArrowDown = faCartArrowDown;
  faSetting = faSliders;
  constructor(
    public basketService: BasketService,
    public accountService: AccountService
  ) {}
  ngOnInit(): void {
    this.accountService.currentRole$.subscribe((data: any) => {
      this.role = data?.role
      console.log(this.role);
    });
  }
  getCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
