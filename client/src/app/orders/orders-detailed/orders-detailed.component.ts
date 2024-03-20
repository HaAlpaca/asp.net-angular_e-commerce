import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-orders-detailed',
  templateUrl: './orders-detailed.component.html',
  styleUrls: ['./orders-detailed.component.scss'],
})
export class OrdersDetailedComponent implements OnInit {
  order?: Order;
  constructor(
    private ordersService: OrdersService,
    private routes: ActivatedRoute,
    private bcService: BreadcrumbService
  ) {}
  ngOnInit(): void {
    const id = this.routes.snapshot.paramMap.get('id');
    id && this.ordersService.getOrderDetailed(+id).subscribe({
        next: order => {
          this.order = order;
          this.bcService.set(
            '@OrderDetailed',
            `Order ${order.id} - ${order.status}`
          );
        },
      });
  }
}
