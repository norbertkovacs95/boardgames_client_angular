import { ErrorStateMatcher } from '@angular/material/core'
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class PasswordErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      let password = form.form.get('password');
     return password.value !== control.value && control.touched;
    }
  }