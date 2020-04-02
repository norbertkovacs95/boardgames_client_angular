import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../app/login/login.component';
import { GamesComponent } from '../app/games/games.component';
import { MineSweeperMenuComponent } from '../app/mine-sweeper/mine-sweeper-menu/mine-sweeper-menu.component'

const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { 
    path: 'games',
    component: GamesComponent,
    children: [
      { path: '', component: MineSweeperMenuComponent },
      { path: 'pickpugpoop', component: MineSweeperMenuComponent }
    ] 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
