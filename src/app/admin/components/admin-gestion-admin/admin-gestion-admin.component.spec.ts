import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGestionAdminComponent } from './admin-gestion-admin.component';

describe('AdminGestionAdminComponent', () => {
  let component: AdminGestionAdminComponent;
  let fixture: ComponentFixture<AdminGestionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGestionAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGestionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
