import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { LoginComponent } from '../app/login/login.component';
import { GamesComponent } from '../app/games/games.component';
import { MineSweeperMenuComponent } from '../app/mine-sweeper/mine-sweeper-menu/mine-sweeper-menu.component'
import { SnakeComponent } from '../app/snake/snake.component';
import { SudokuComponent } from '../app/sudoku/sudoku.component';
import { SignupComponent } from '../app/signup/signup.component';

const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { 
    path: 'games',
    component: GamesComponent,
    children: [
      { path: '', redirectTo: '/games/pickpugpoop', pathMatch: 'full' },
      { path: 'pickpugpoop', component: MineSweeperMenuComponent },
      { path:'snake', component: SnakeComponent },
      { path:'sudoku', component: SudokuComponent }
    ] 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
        this.router.navigate(['/login']); // or 404 page
    }
  }
}
