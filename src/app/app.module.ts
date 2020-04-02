import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material';
import { MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

import { MineSweeperGameComponent } from './mine-sweeper/mine-sweeper-game.component';
import { MineSweeperMenuComponent } from './mine-sweeper/mine-sweeper-menu/mine-sweeper-menu.component';
import { MineSweeperPopupComponent } from './mine-sweeper/mine-sweeper-popup/mine-sweeper-popup.component';
import { LoginComponent } from './login/login.component';
import { GamesComponent } from './games/games.component';
import { SnakeComponent } from './snake/snake.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MineSweeperGameComponent,
    MineSweeperMenuComponent,
    MineSweeperPopupComponent,
    LoginComponent,
    GamesComponent,
    SnakeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MineSweeperGameComponent,MineSweeperPopupComponent]
})
export class AppModule { }
