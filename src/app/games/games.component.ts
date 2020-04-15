import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor(    
    private authService: AuthenticationService,
    private router: Router) {
      this.authService.isUserVerified()
        .subscribe(
          (resp) => {
            if (!resp.success) {
              window.localStorage.removeItem('token');
              this.router.navigate(['/login']);
            }
          },
          (err) => {
            window.localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
        )
    }

  ngOnInit() {
  }

}
