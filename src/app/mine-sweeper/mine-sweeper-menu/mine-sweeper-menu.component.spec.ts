import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineSweeperMenuComponent } from './mine-sweeper-menu.component';

describe('MineSweeperMenuComponent', () => {
  let component: MineSweeperMenuComponent;
  let fixture: ComponentFixture<MineSweeperMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineSweeperMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineSweeperMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
