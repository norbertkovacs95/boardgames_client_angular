import { Component, OnInit,Inject,ViewEncapsulation } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-mine-sweeper-popup',
  templateUrl: './mine-sweeper-popup.component.html',
  styleUrls: ['./mine-sweeper-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MineSweeperPopupComponent implements OnInit {

  winView:  boolean = false;
  looseView: boolean = false;
  startView: boolean = false;
  infoView:boolean = false;
  mines:number;

  constructor(@Inject(MAT_DIALOG_DATA) data) { 
    if(typeof data.winView !== 'undefined') this.winView = data.winView;
    if(typeof data.looseView !== 'undefined') this.looseView = data.looseView;
    if(typeof data.startView !== 'undefined') this.startView = data.startView;
    if(typeof data.infoView !== 'undefined') this.infoView = data.infoView;
    if(typeof data.mines !== 'undefined') this.mines = data.mines;
  }

  ngOnInit() {
  }

}
