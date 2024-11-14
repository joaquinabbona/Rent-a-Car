import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGestionVehiculosComponent } from './admin-gestion-vehiculos.component';

describe('AdminGestionVehiculosComponent', () => {
  let component: AdminGestionVehiculosComponent;
  let fixture: ComponentFixture<AdminGestionVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGestionVehiculosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGestionVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
