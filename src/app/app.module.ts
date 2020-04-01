import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MineSweeperGameComponent } from './mine-sweeper/mine-sweeper-game.component';
import { MineSweeperMenuComponent } from './mine-sweeper/mine-sweeper-menu/mine-sweeper-menu.component';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MineSweeperPopupComponent } from './mine-sweeper/mine-sweeper-popup/mine-sweeper-popup.component'

@NgModule({
  declarations: [
    AppComponent,
    MineSweeperGameComponent,
    MineSweeperMenuComponent,
    MineSweeperPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MineSweeperGameComponent,MineSweeperPopupComponent]
})
export class AppModule { }
