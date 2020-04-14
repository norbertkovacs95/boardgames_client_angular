import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRespError: string;
  
  formErrors = {
    'username': '',
    'password': ''
  };

  validationMessages = {
    'username': {
      'required':'Email is required.',
      'email': 'Email must be in correct format'
    },
    'password' : {
      'required':'Password is required.'
    }
  };

  constructor(private fb: FormBuilder) { 
    
  }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['',[Validators.required]]
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChangeLogin(data));
    this.onValueChangeLogin();

  }

  onValueChangeLogin(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;

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

  onSubmitLogin() {

  }

}
