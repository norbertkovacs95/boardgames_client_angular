import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordErrorStateMatcher } from '../shared/passwordErrorMatcher';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  signupRespError: string;
  errorMatcher = new PasswordErrorStateMatcher();

  formErrors = {
    'username': '',
    'email': '',
    'password': '',
    'passwordAgain': ''
  };

  validationMessages = {
    'username': {
      'required':'Username is required.'
    },
    'email': {
      'required':'Email is required.',
      'email': 'Email must be in correct format'
    },
    'password' : {
      'required':'Password is required.'
    },
    'passwordAgain' : {
      'required':'Password confirmation is required.',
      'notSame': 'The provided passwords must match'
    }
  };

  constructor(private fb: FormBuilder) { 
    
  }

  ngOnInit() {
    this.createSignupForm();
  }

  checkPasswords(group: FormGroup) { 
    let pass = group.get('password').value;
    let confirmPass = group.get('passwordAgain').value;
    return pass === confirmPass ? null : { notSame: true }     
  } 

  createSignupForm() {
    this.signupForm = this.fb.group({
      username: ['',[Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
      passwordAgain: ['',[Validators.required]]
    }, {validator: this.checkPasswords });

    this.signupForm.valueChanges
      .subscribe(data => this.onValueChangeSignin(data));
    this.onValueChangeSignin();
    console.log(this.signupForm)
  }

  onValueChangeSignin(data?: any) {
    if (!this.signupForm) { return; }
    const form = this.signupForm;

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

    if (form.get('password').dirty) {
      if (form.get('password').value !== form.get('passwordAgain').value) {
        this.formErrors['passwordAgain'] = this.validationMessages['passwordAgain']['notSame'];
      }
    }
  }

  onSubmitLogin() {

  }

}
