import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineSweeperPopupComponent } from './mine-sweeper-popup.component';

describe('MineSweeperGamefinishComponent', () => {
  let component: MineSweeperPopupComponent;
  let fixture: ComponentFixture<MineSweeperPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineSweeperPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineSweeperPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
