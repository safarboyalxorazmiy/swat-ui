import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsComponent } from './gs.component';

describe('GsComponent', () => {
  let component: GsComponent;
  let fixture: ComponentFixture<GsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
