import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpProductComponent } from './gp-product.component';

describe('GpProductComponent', () => {
  let component: GpProductComponent;
  let fixture: ComponentFixture<GpProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
