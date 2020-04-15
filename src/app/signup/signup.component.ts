import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PasswordErrorStateMatcher } from '../shared/passwordErrorMatcher';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../shared/user';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
    ) { 
      if(this.authService.isAuthenticated()) this.router.navigate(['/games']);
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

  onSubmitSignup() {
    let user: User = this.signupForm.value;
    this.authService.signupUser(user)
      .subscribe(
        (resp) => {
          if (resp.status === 200) {
            window.localStorage.setItem('token', resp.token);
            this.router.navigate(['/games']);
          }
        },
        (err) => {
          this.signupForm.reset();
          this.signupRespError = err.status === 409 ? 
            err.error.err.message :
            'An unknown error occured, please try again';
        }
      )
  }

}
