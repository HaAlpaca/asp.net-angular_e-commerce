import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './text-input/text-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StepperComponent } from './components/stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { BasketSummaryComponent } from './basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    HomeCarouselComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent,
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    CarouselModule,
    BsDropdownModule.forRoot(),
    CdkStepperModule,
    RouterModule,
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    ReactiveFormsModule,
    HomeCarouselComponent,
    BsDropdownModule,
    TextInputComponent,
    StepperComponent,
    CdkStepperModule,
    BasketSummaryComponent,
  ],
})
export class SharedModule {}
