import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-lostpassword',
  templateUrl: './lostpassword.component.html',
  styleUrls: ['./lostpassword.component.scss']
})
export class LostpasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;

  formErrors = {
    'email': ''
  };

  validationMessages = {
    'email': {
      'required':'Email is required.',
      'email': 'Email must be in correct format'
    }
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
    ) { 
      if(this.authService.isAuthenticated()) this.router.navigate(['/games']);
  }

  ngOnInit() {
    this.createResetPasswordForm();
  }

  createResetPasswordForm() {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]]
    });

    this.resetPasswordForm.valueChanges
      .subscribe(data => this.onValueChangeResetPass(data));
    this.onValueChangeResetPass();
  }

  onValueChangeResetPass(data?: any) {
    if (!this.resetPasswordForm) { return; }
    const form = this.resetPasswordForm;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {

        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] = messages[key];
                break;
              }
          }
        }
      }
    }
  }

  onSubmitResetPass() {
    this.router.navigate(['/login']);
  }


}
