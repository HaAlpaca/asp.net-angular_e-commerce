import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  ngOnInit(): void {
    this.getOrder();
  }

  orders: Order[] = [];
  constructor(private ordersService: OrdersService) {}

  getOrder() {
    this.ordersService.getOrderForUser().subscribe({
      next: (order) => (this.orders = order),
    });
  }
}
