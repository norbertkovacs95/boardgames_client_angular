import { Component, OnInit,ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { MineSweeperGameComponent } from '../mine-sweeper-game.component';
import { PickPugPoopResults } from '../../shared/DUMYRESULT';
import { PickPugPoopResult } from '../../shared/pickpugpoopResult';

@Component({
  selector: 'app-mine-sweeper-menu',
  templateUrl: './mine-sweeper-menu.component.html',
  styleUrls: ['./mine-sweeper-menu.component.scss']
})
export class MineSweeperMenuComponent implements OnInit {

  displayedColumns: string[] = ['Username', 'Date', 'Difficulty', 'Time'];
  playHistory: PickPugPoopResult[] = PickPugPoopResults;
  playHistorySource: MatTableDataSource<PickPugPoopResult>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog) { 
    this.playHistorySource = new MatTableDataSource(this.playHistory);
  }

  ngOnInit() {
    this.playHistorySource.paginator = this.paginator;
    this.playHistorySource.sort = this.sort;
  }

  openGame(difficulty: string) {
    switch (difficulty) {
      case 'easy':
        this.dialog.open(MineSweeperGameComponent, {width: '454px', height: '544px',
          data: {
            difficulty: 'easy',
            mines: 10
          }
        });
        break;

      case 'medium':
        this.dialog.open(MineSweeperGameComponent, {width: '484px', height: '584px',
        data: {
          difficulty: 'medium',
          mines: 25
          }
        });
        break;

      case 'hard':
        this.dialog.open(MineSweeperGameComponent, {width: '564px', height: '664px',
        data: {
          difficulty: 'hard',
          mines: 60
          }
        });
        break;
    }
    
  }
}
