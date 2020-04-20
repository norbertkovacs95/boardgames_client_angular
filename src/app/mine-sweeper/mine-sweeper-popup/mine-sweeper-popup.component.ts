import { Component, OnInit,Inject,ViewEncapsulation } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';

import { PickPugPoopResultService } from '../../services/pickpugpoop-result.service';
import { PickPugPoopResult } from '../../shared/pickpugpoopResult';

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
  difficulty: string;
  time: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private resultService: PickPugPoopResultService,
    private snackBar: MatSnackBar
    ) { 
      if(typeof data.looseView !== 'undefined') this.looseView = data.looseView;
      if(typeof data.startView !== 'undefined') this.startView = data.startView;
      if(typeof data.infoView !== 'undefined') this.infoView = data.infoView;
      if(typeof data.mines !== 'undefined') this.mines = data.mines;
      if(typeof data.winView !== 'undefined') {
        this.winView = data.winView;
        this.difficulty = data.difficulty;
        this.time = data.time;

        let result: PickPugPoopResult = this.crateResultObject();
        this.resultService.postResults(result, data.gameStartToken)
          .subscribe(
            () => {
              this.snackBar.open('Your result is saved, check the dashboard for more information', 'Close', {
                duration: 5000
              });
            }
          ,(err) => {
            this.snackBar.open('A server error occure :( ', 'Close', {
              duration: 5000
            });
          })
      }
  }

  ngOnInit() {
  }

  crateResultObject(): PickPugPoopResult {
    let result = new PickPugPoopResult();
    result.date = new Date();
    result.difficulty = this.difficulty;
    result.time = this.time;
    return result;
  } 

}
