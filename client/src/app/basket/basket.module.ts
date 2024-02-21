import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket/basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [BasketComponent],
  imports: [
    FontAwesomeModule,
    CommonModule,
    BasketRoutingModule,
    SharedModule
  ],
})
export class BasketModule {}
