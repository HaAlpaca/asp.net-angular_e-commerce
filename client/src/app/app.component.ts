import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'E-Shopping';
  products: any[] = [];

  constructor(private http: HttpClient, private basketService: BasketService) {}

  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_Id');
    if (basketId) this.basketService.getBasket(basketId);
  }
}
