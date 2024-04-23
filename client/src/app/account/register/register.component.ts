import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  errors: string[] | null = null;
  complexPassword = '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';
  complexPhone = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$';
  registerForm = this.fb.group({
    displayName: ['', Validators.required],
    email: [
      '',
      [Validators.required, Validators.email],
      [this.validateEmailNotTaken()],
    ],
    password: [
      '',
      [Validators.required, Validators.pattern(this.complexPassword)],
    ],
    phonenumber: [
      '',
      [Validators.required, Validators.pattern(this.complexPhone)],
    ],
  });

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/shop'),
      error: (error) => (this.errors = error.errors),
    });
  }
  validateEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.accountService.checkEmailExists(control.value).pipe(
            map((result) => (result ? { emailExists: true } : null)),
            finalize(() => control.markAsTouched())
          );
        })
      );
    };
  }
}
