import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { MineSweeperPopupComponent} from './mine-sweeper-popup/mine-sweeper-popup.component';

@Component({
  selector: 'app-mine-sweeper-game',
  templateUrl: './mine-sweeper-game.component.html',
  styleUrls: ['./mine-sweeper-game.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MineSweeperGameComponent implements OnInit, OnDestroy {

  difficulty: string;
  mines: number;
  playBoard: MineSweeperBoard;
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('imageContainer', { static: true }) imageContainer: ElementRef<HTMLDivElement>;
  @ViewChild('grass', { static: true }) grass: ElementRef<HTMLImageElement>;
  @ViewChild('pug', { static: true }) pug: ElementRef<HTMLImageElement>;
  @ViewChild('poop', { static: true }) poop: ElementRef<HTMLImageElement>;
  @ViewChild('timer', { static: true }) timerEl: ElementRef<HTMLElement>;

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {
    this.difficulty = data.difficulty;
    this.mines = data.mines;
   }

  ngOnInit() {
    let images = this.imageContainer.nativeElement.querySelectorAll('img');
    let loadedImages: number = 0;

    for (let i = 0; i < images.length; i++) {
      images[i].onload = () => {
        loadedImages += 1;
        if (loadedImages === images.length) this.createGame();
      }
    }

    const dialogRef = this.dialog.open(MineSweeperPopupComponent, {width: '350px', height: '350px',data:{
      startView: true
    }});

    dialogRef.afterClosed().subscribe(() => {
      this.dialog.open(MineSweeperPopupComponent, {width: '350px', height: '350px',data:{
        infoView: true,
        mines: this.mines
      }});
    })
  }

  ngOnDestroy(): void {
    if (typeof this.playBoard !== 'undefined') this.playBoard.stopTimer(); 
  }

  createGame() {
    if (typeof this.playBoard !== 'undefined') this.playBoard.stopTimer(); 
    this.playBoard = new MineSweeperBoard(this.difficulty, this.canvas, this.grass,this.pug, this.poop, this.timerEl, this.dialog,'#b1f774', '#5D5959');
  }

  resetGame() {
    this.createGame();
    this.timerEl.nativeElement.innerHTML = "00 : 00"
  }
 
}


class MineSweeperBoard {

  private timerFunction: number;
  private timerStartDate: Date;
  private timerEl: ElementRef<HTMLElement>;
  private dialog: MatDialog;

  public flags: number = 0;
  private mines: number;
  private units: number;
  private clickedUnits: number = 0;
  private unitPx: number;
  private gameEnded: boolean = false;
  private gameStarted: boolean= false;

  private canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private rectColor: string = '#8ddd46';
  private rectBorderColor: string = '#5D5959';
  private blankColor: string = '#544545';
  private boardUnits: MineSweeperUnit[][];

  private grassImg: ElementRef<HTMLImageElement>;
  private pugImg: ElementRef<HTMLImageElement>;
  private poopImg: ElementRef<HTMLImageElement>;

  constructor(difficulty: string, canvasEl: ElementRef<HTMLCanvasElement>, grassEl: ElementRef<HTMLImageElement>,
              pugEl: ElementRef<HTMLImageElement>,poopEl: ElementRef<HTMLImageElement>, 
              timerEl: ElementRef, dialog: MatDialog, rectColor?: string, rectBorderColor?: string, blankColor?:string) {
    
    this.dialog = dialog;
    this.canvas = canvasEl;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.grassImg = grassEl;
    this.pugImg = pugEl;
    this.poopImg = poopEl;
    this.timerEl = timerEl;
    if(typeof rectColor !== 'undefined') this.rectColor = rectColor;
    if(typeof rectBorderColor !== 'undefined') this.rectBorderColor = rectBorderColor;
    if(typeof blankColor !== 'undefined') this.blankColor = blankColor;

    if (difficulty === 'easy') {
      this.unitPx = 50;
      this.canvas.nativeElement.width = 450;
      this.canvas.nativeElement.height = 450;
      this.mines = 10;
      this.units = 81;
      this.drawCanvas(9,9);
      this.createBoardUnits(9,9,this.mines);
    } else if (difficulty === 'medium') {
      this.unitPx = 40;
      this.canvas.nativeElement.width = 480;
      this.canvas.nativeElement.height = 480;
      this.mines = 25;
      this.units = 256;
      this.drawCanvas(12,12);
      this.createBoardUnits(12,12,this.mines);
    } else if (difficulty === 'hard') {
      this.unitPx = 35;
      this.canvas.nativeElement.width = 560;
      this.canvas.nativeElement.height = 560;
      this.mines = 60;
      this.units = 256;
      this.drawCanvas(16,16);
      this.createBoardUnits(16,16,this.mines);
    } else {
      throw new Error(`Difficulty must be easy, medium or hard, instead got: ${difficulty}`);
    }

    this.setmouseEvents();
  }

  private drawCanvas(height: number, width: number):void {
    for (let w = 0; w < width; w++) {
      for (let h = 0; h < height; h++) {
        this.drawUnitOnBoard(w * this.unitPx, h * this.unitPx);
      }
    }
  }

  private createBoardUnits(width, height, mines):void {
    this.boardUnits = new Array(height);
    for (let h = 0; h < height; h++) {
      this.boardUnits[h] = new Array(width);
      for (let w = 0; w < width; w++) {
        this.boardUnits[h][w] = new MineSweeperUnit(w * this.unitPx, h * this.unitPx, '' + h + '_' + w);
      }
    }

    let _mines: number = 0;
    while(_mines < mines) {
      let randW = Math.floor(Math.random() * width );
      let randH = Math.floor(Math.random() * height );
      if(!this.boardUnits[randH][randW].isMine) {
        this.boardUnits[randH][randW].isMine = true;
        _mines += 1;
      }
    }

    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        let mines = 0;
        let units: MineSweeperUnit[] = this.getNerbyUnits(this.boardUnits[h][w]);
        units.forEach(unit => { if(unit.isMine) mines+=1 });
        this.boardUnits[h][w].nearbyMines = mines;
      }
    }
  }

  private setmouseEvents(): void {
    let _canvas = this.canvas.nativeElement;
    let board = this;

    //Set event on canvas left click
    this.canvas.nativeElement.onclick = function(e: MouseEvent) {
      if (!board.gameStarted) board.setTimerFunction();
      let rect: DOMRect = _canvas.getBoundingClientRect() as DOMRect;
      let unitW = Math.floor((e.x - rect.x) / board.unitPx);
      let unitH = Math.floor((e.y - rect.y) / board.unitPx);
      let unit: MineSweeperUnit = board.boardUnits[unitH][unitW];
      
      //Check if unit is already clicked or flagged, else nothing happens
      if (!unit.isClicked && !unit.isFlagged && !board.gameEnded) {
        board.boardUnits[unitH][unitW].isClicked = true;

        //The clicked unit is a mine, so the game ends
        if(unit.isMine) {
          board.drawMineOnBoard(unit.x, unit.y);
          board.gameEndHandler(false);
        } else {

          //Clicked unit has no nerby mines, so al its neighbours have to checked
          if (unit.nearbyMines === 0) {
            let unitsToShow: MineSweeperUnit[] = [];
            unitsToShow.push(unit);
            
            while(unitsToShow.length) {
              let arrayToPush : MineSweeperUnit[] = [];
              
              unitsToShow.forEach(unit => {
                if(unit.nearbyMines === 0) {
                  let nearbyUnits: MineSweeperUnit[] = board.getNerbyUnits(unit);
                  nearbyUnits.forEach(_unit => {
                    let isInArr: boolean =  arrayToPush.map(unit => unit.id).indexOf(_unit.id) >= 0;
                    if (!_unit.isMine && !_unit.isClicked && !_unit.isFlagged && !isInArr) arrayToPush.push(_unit); 
                  });
                  board.drawBlankUnit(unit.x, unit.y);
                } else if(unit.nearbyMines > 0) {
                  board.drawNumberOnBoard(String(unit.nearbyMines), unit.x , unit.y );
                }
                board.boardUnits[Number(unit.id.split('_')[0])][Number(unit.id.split('_')[1])].isClicked = true;
                board.clickedUnits += 1;
              })
              arrayToPush = arrayToPush.filter(unit => !unit.isClicked);
              unitsToShow = [...arrayToPush];
            }
      
          //Clicked unit has nerby mine(s), so only the number will be drawn on canvas
          } else {
            board.drawNumberOnBoard(String(unit.nearbyMines),  unit.x , unit.y );
            board.clickedUnits += 1;
          }

          //Check if game ended
          if((board.units - board.clickedUnits) === board.mines)  board.gameEndHandler(true);
        }
      }
    }

    //Set right click event on canvas
    this.canvas.nativeElement.oncontextmenu = function(e: MouseEvent) {

      if (e.button == 2) {
        if (!board.gameStarted) board.setTimerFunction();
        let rect: DOMRect = _canvas.getBoundingClientRect() as DOMRect;
        let unitW = Math.floor((e.x - rect.x) / board.unitPx);
        let unitH = Math.floor((e.y - rect.y) / board.unitPx);
        let unit: MineSweeperUnit = board.boardUnits[unitH][unitW];
        
        if (!unit.isClicked && !board.gameEnded) {
          if (unit.isFlagged) {
            board.flags -= 1;
            board.drawUnitOnBoard(unit.x, unit.y);
            board.boardUnits[Number(unit.id.split('_')[0])][Number(unit.id.split('_')[1])].isFlagged = false;
          } else if(!unit.isFlagged && board.flags < board.mines){
            board.flags += 1;
            board.drawFlagOnBoard(unit.x, unit.y)
            board.boardUnits[Number(unit.id.split('_')[0])][Number(unit.id.split('_')[1])].isFlagged = true;
          }
        }
        return false;
      }

    }
  }

  private setTimerFunction():void {
    this.gameStarted = true;
    this.timerStartDate = new Date();
    this.timerFunction = window.setInterval(() => {
      let currDate = new Date();
      let timePassed: number = Math.round(Math.abs((this.timerStartDate.getTime() - currDate.getTime()) / 1000));
      let minutes: any = Math.floor(timePassed / 60);
      let seconds: any = timePassed - minutes * 60;
      if (minutes < 10 ) minutes = '0' + minutes;
      if(seconds < 10 ) seconds = '0' + seconds;

      this.timerEl.nativeElement.innerHTML = `${minutes} : ${seconds}`
    }, 1000)
  }

  private getNerbyUnits(unit: MineSweeperUnit): MineSweeperUnit[] {
    let hDim = this.boardUnits.length - 1;
    let wDim = this.boardUnits.length - 1;
    let h = unit.y / this.unitPx;
    let w = unit.x / this.unitPx;
    let nearbyUnits: MineSweeperUnit[] = [];
    
    if(h-1 >= 0 && w >= 0 && h-1 <= hDim && w <= wDim) { nearbyUnits.push(this.boardUnits[h-1][w]); }
    if(h+1 >= 0 && w >= 0 && h+1 <= hDim && w <= wDim) { nearbyUnits.push(this.boardUnits[h+1][w]); }
    if(h >= 0 && w-1 >= 0 && h <= hDim && w-1 <= wDim) { nearbyUnits.push(this.boardUnits[h][w-1]); }
    if(h >= 0 && w+1 >= 0 && h <= hDim && w+1 <= wDim) { nearbyUnits.push(this.boardUnits[h][w+1]); }
    if(h-1 >= 0 && w-1 >= 0 && h-1 <= hDim && w-1 <= wDim) { nearbyUnits.push(this.boardUnits[h-1][w-1]); }
    if(h-1 >= 0 && w+1 >= 0 && h-1 <= hDim && w+1 <= wDim) { nearbyUnits.push(this.boardUnits[h-1][w+1]); }
    if(h+1 >= 0 && w+1 >= 0 && h+1 <= hDim && w+1 <= wDim) { nearbyUnits.push(this.boardUnits[h+1][w+1]); }
    if(h+1 >= 0 && w-1 >= 0 && h+1 <= hDim && w-1 <= wDim) { nearbyUnits.push(this.boardUnits[h+1][w-1]); }
    
    return nearbyUnits;
  }

  private gameEndHandler(isWin: boolean):void {
    this.gameEnded = true;
    if (isWin) {
      this.dialog.open(MineSweeperPopupComponent, {width: '350px', height: '300px',data:{
        winView: true
      }});
    } else {
      this.dialog.open(MineSweeperPopupComponent, {width: '350px', height: '300px',data:{
        looseView: true
      }});
    }
    this.stopTimer();
  }

  public stopTimer():void {
    window.clearInterval(this.timerFunction);
  }

  private drawUnitOnBoard(x: number, y: number):void {
    this.ctx.fillStyle = this.rectColor;
    this.ctx.fillRect(x,y,this.unitPx,this.unitPx);
    this.ctx.drawImage(this.grassImg.nativeElement, x,y,this.unitPx,this.unitPx);
  }

  private drawFlagOnBoard(x: number, y: number):void {
    this.ctx.fillStyle = this.rectColor;
    this.ctx.fillRect(x,y,this.unitPx,this.unitPx);
    this.ctx.drawImage(this.pugImg.nativeElement, x + Math.round(this.unitPx * 0.15),y,Math.round(this.unitPx * 0.75),this.unitPx);
  }

  private drawNumberOnBoard(number: string,  x: number, y:number):void {
    this.ctx.fillStyle = this.rectColor;
    this.ctx.fillRect(x , y ,this.unitPx,this.unitPx);
    this.ctx.font = `${this.unitPx}px Alef`;
    this.ctx.fillStyle = this.blankColor;
    this.ctx.textAlign = "center";
    this.ctx.fillText(number, x + this.unitPx / 2 , y + this.unitPx - Math.floor(this.unitPx * 0.1));
  }

  private drawBlankUnit(x: number, y:number):void {
    this.ctx.fillStyle = this.rectColor;
    this.ctx.fillRect(x, y, this.unitPx, this.unitPx);
  }

  private drawMineOnBoard(x: number, y:number):void {
    this.ctx.fillStyle = this.rectColor;
    this.ctx.fillRect(x,y,this.unitPx,this.unitPx);
    this.ctx.drawImage(this.poopImg.nativeElement, x,y,this.unitPx,this.unitPx);
  }

}

class MineSweeperUnit {

  private _isMine: boolean;
  private _isFlagged: boolean;
  private _isClicked: boolean;
  private _nearbyMines: number;
  private _x: number;
  private _y: number;
  private _id: string;

  constructor(x: number, y:number, id: string) {
   this._isClicked = false;
   this._isFlagged = false;
   this._isMine= false;
   this.nearbyMines= 0;
   this._x = x;
   this._y = y;
   this._id = id;
  }

  get isMine():boolean { return this._isMine; }
  get isFlagged():boolean  { return this._isFlagged; }
  get isClicked():boolean  { return this._isClicked; }
  get nearbyMines():number { return this._nearbyMines; }
  get x():number  { return this._x; }
  get y():number  { return this._y; }
  get id():string { return this._id; }

  set isMine(mineState: boolean) { this._isMine = mineState; }
  set isFlagged(flaggedState: boolean) { this._isFlagged = flaggedState; }
  set isClicked(clickedState: boolean) { this._isClicked = clickedState; }
  set nearbyMines(mines: number) { this._nearbyMines = mines; }

}
