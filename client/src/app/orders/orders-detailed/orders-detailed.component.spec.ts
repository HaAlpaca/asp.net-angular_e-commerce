import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDetailedComponent } from './orders-detailed.component';

describe('OrdersDetailedComponent', () => {
  let component: OrdersDetailedComponent;
  let fixture: ComponentFixture<OrdersDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
