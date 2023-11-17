import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerIncomeComponent } from './container-income.component';

describe('ContainerIncomeComponent', () => {
  let component: ContainerIncomeComponent;
  let fixture: ComponentFixture<ContainerIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
