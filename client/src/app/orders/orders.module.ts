import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailedComponent } from './orders-detailed/orders-detailed.component';
import { OrdersRoutingModule } from './orders-routing/orders-routing.module';

@NgModule({
  declarations: [OrdersComponent, OrdersDetailedComponent],
  imports: [CommonModule, OrdersRoutingModule],
})
export class OrdersModule {}
