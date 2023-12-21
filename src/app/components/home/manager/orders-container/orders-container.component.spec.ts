import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersContainerComponent } from './orders-container.component';

describe('OrdersContainerComponent', () => {
  let component: OrdersContainerComponent;
  let fixture: ComponentFixture<OrdersContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersContainerComponent]
    });
    fixture = TestBed.createComponent(OrdersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
