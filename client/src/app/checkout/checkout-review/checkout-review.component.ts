import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss'],
})
export class CheckoutReviewComponent {
  @Input() appStepper?: CdkStepper;
  angleLeft = faAngleLeft;
  angleRight = faAngleRight;

  constructor(
    private basketService: BasketService,
    private toastr: ToastrService
  ) {}
  createPaymentIntent() {
    this.basketService.createPaymentIntent().subscribe({
      next: () => {
        this.appStepper?.next()
      },
      error: (error) => this.toastr.error(error.message),
    });
  }
}
