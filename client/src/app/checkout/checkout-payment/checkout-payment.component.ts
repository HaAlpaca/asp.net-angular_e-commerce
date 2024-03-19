import { Component } from '@angular/core';
import { faAngleLeft, faAngleRight, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent {
  angleLeft = faAngleLeft;
  faMoney = faMoneyCheck;
}
