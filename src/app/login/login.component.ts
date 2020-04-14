import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../shared/user';

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
      'required':'Username is required.'
    },
    'password' : {
      'required':'Password is required.'
    }
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
    ) { 
    
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
    console.log(this.loginForm)
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
    let user: User = this.loginForm.value;

    this.authService.loginUser(user)
      .subscribe(
        (resp) => {
          if (resp.status === 200) {
            window.localStorage.setItem('token', resp.token);
            this.router.navigate(['/games']);
          }
        },
        (err) => {
          this.loginForm.reset();
          this.loginRespError = err.status === 401 ?
            'The given username or password is invalid' :
            'An unknown error occured, please try again';
        }
      )
  }

}
