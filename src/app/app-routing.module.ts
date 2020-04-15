import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { AuthGuard } from '../app/guards/auth.guard';
import { LoginComponent } from '../app/login/login.component';
import { GamesComponent } from '../app/games/games.component';
import { MineSweeperMenuComponent } from '../app/mine-sweeper/mine-sweeper-menu/mine-sweeper-menu.component'
import { SnakeComponent } from '../app/snake/snake.component';
import { SudokuComponent } from '../app/sudoku/sudoku.component';
import { SignupComponent } from '../app/signup/signup.component';
import { LostpasswordComponent } from '../app/lostpassword/lostpassword.component';

const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'lostpassword', component: LostpasswordComponent},
  { 
    path: 'games',
    component: GamesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/games/pickpugpoop', pathMatch: 'full' },
      { path: 'pickpugpoop', component: MineSweeperMenuComponent },
      { path:'snake', component: SnakeComponent },
      { path:'sudoku', component: SudokuComponent }
    ] 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' } // or handle 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
