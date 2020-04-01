import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineSweeperGameComponent } from './mine-sweeper-game.component';

describe('MineSweeperComponent', () => {
  let component: MineSweeperGameComponent;
  let fixture: ComponentFixture<MineSweeperGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineSweeperGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineSweeperGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
