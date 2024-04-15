import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'E-Shopping';
  products: any[] = [];
  public role: any;
  constructor(
    private http: HttpClient,
    private basketService: BasketService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
    this.getCurrentRole();
  }
  loadBasket() {
    const basketId = localStorage.getItem('basket_Id');
    if (basketId) this.basketService.getBasket(basketId);
  }
  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe();
  }
  getCurrentRole() {
    var token  = localStorage.getItem('token')
    
  }
}
