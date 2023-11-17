import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellIncomeComponent } from './cell-income.component';

describe('CellIncomeComponent', () => {
  let component: CellIncomeComponent;
  let fixture: ComponentFixture<CellIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
