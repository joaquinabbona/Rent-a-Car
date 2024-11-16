import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailsToEditComponent } from './car-details-to-edit.component';

describe('CarDetailsToEditComponent', () => {
  let component: CarDetailsToEditComponent;
  let fixture: ComponentFixture<CarDetailsToEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarDetailsToEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetailsToEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
