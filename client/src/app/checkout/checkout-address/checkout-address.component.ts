import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent {
  angleLeft = faAngleLeft;
  angleRight = faAngleRight;
  @Input() checkoutForm?: FormGroup;
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  saveUserAddess() {
    this.accountService
      .updateUserAddress(this.checkoutForm?.get('addressForm')?.value)
      .subscribe({
        next: () => {
          this.toastr.success('Address saved');
          this.checkoutForm
            ?.get('addressForm')
            ?.reset(this.checkoutForm?.get('addressForm')?.value);
        },
        error: () => this.toastr.error('Address save fail'),
      });
  }
}
