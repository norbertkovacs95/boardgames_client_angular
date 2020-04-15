import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-lostpassword',
  templateUrl: './lostpassword.component.html',
  styleUrls: ['./lostpassword.component.scss']
})
export class LostpasswordComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
    ) { 
    if(this.authService.isAuthenticated()) this.router.navigate(['/games']);
  }

  ngOnInit() {
  }

}
