import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MineSweeperGameComponent } from '../mine-sweeper-game.component';

@Component({
  selector: 'app-mine-sweeper-menu',
  templateUrl: './mine-sweeper-menu.component.html',
  styleUrls: ['./mine-sweeper-menu.component.scss']
})
export class MineSweeperMenuComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openGame() {
    this.dialog.open(MineSweeperGameComponent, {width: '454px', height: '554px'});
  }
}
