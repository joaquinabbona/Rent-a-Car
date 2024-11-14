import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGestionClientesComponent } from './admin-gestion-clientes.component';

describe('AdminGestionClientesComponent', () => {
  let component: AdminGestionClientesComponent;
  let fixture: ComponentFixture<AdminGestionClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGestionClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGestionClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
