import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  faAngleLeft,
  faMoneyCheck,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/shared/models/basket';
import { Address } from 'src/app/shared/models/user';
import { NavigationExtras, Router } from '@angular/router';
import {
  Stripe,
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardNumberElement,
  loadStripe,
} from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
import { OrderToCreate } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements OnInit {
  angleLeft = faAngleLeft;
  faMoney = faMoneyCheck;
  Spinner = faSpinner;
  @Input() checkoutForm?: FormGroup;
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;

  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  cardNumberComplete = false;
  cardExpiryComplete = false;
  cardCvcComplete = false;
  cardErr: any;
  loading = false;
  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    loadStripe(
      'pk_test_51P58Ht09q4SgMmRyhsplsPCkWTw8BiigoKFO2LEHmIPVBOaVKDgDreMAG7yMJUn5LI8B4y9tUYY2Z3KVHJsmryM100wNUcpgb4'
    ).then((stripe) => {
      this.stripe = stripe;
      const element = stripe?.elements();
      if (element) {
        this.cardNumber = element.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement?.nativeElement);
        this.cardNumber.on('change', (event) => {
          this.cardNumberComplete = event.complete;
          if (event.error) this.cardErr = event.error.message;
          else this.cardErr = null;
        });
        this.cardExpiry = element.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
        this.cardExpiry.on('change', (event) => {
          this.cardExpiryComplete = event.complete;
          if (event.error) this.cardErr = event.error.message;
          else this.cardErr = null;
        });
        this.cardCvc = element.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement?.nativeElement);
        this.cardExpiry.on('change', (event) => {
          this.cardCvcComplete = event.complete;
          if (event.error) this.cardErr = event.error.message;
          else this.cardErr = null;
        });
      }
    });
  }

  get paymentFormComplete() {
    return (
      this.checkoutForm?.get('paymentForm')?.valid &&
      this.cardCvcComplete &&
      this.cardExpiryComplete &&
      this.cardNumberComplete
    );
  }

  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    const paymentResult = await this.conmfirmPaymentWithStripe(basket);
    if (!basket) throw new Error('cannot get basket')
    try {
      const createOrder = this.createOrder(basket);
      if (paymentResult.paymentIntent) {
        this.basketService.deleteBasket(basket);
        const navigationExtras: NavigationExtras = { state: createOrder };
        this.router.navigate(['checkout/success'], navigationExtras);
      } else {
        this.toastr.error(paymentResult.error?.message);
      }
    } catch (err: any) {
      console.log(err);
      this.toastr.error(err.message);
    } finally {
      this.loading = false;
    }
  }
  conmfirmPaymentWithStripe(basket: Basket | null) {
    if (!basket) throw new Error('Basket is null');
    const result = this.stripe?.confirmCardPayment(basket.clientSecret!, {
      payment_method: {
        card: this.cardNumber!,
        billing_details: {
          name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value,
        },
      },
    });
    if (!result) throw new Error('Problem attempting payment with stripe');
    return result;
  }
  createOrder(basket: Basket | null) {
    if (!basket) throw new Error('Basket is null');
    const orderToCreate = this.getOrderToCreate(basket);
    return firstValueFrom(this.checkoutService.createOrder(orderToCreate));
  }
  getOrderToCreate(basket: Basket): OrderToCreate {
    const deliveryMethodId = this.checkoutForm
      ?.get('deliveryForm')
      ?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')
      ?.value as Address;
    if (!deliveryMethodId || !shipToAddress)
      throw new Error('Problem with basket');
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress,
    };
  }
}
