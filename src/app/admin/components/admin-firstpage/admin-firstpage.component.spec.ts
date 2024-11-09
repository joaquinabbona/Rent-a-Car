import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFirstpageComponent } from './admin-firstpage.component';

describe('AdminFirstpageComponent', () => {
  let component: AdminFirstpageComponent;
  let fixture: ComponentFixture<AdminFirstpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFirstpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFirstpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
