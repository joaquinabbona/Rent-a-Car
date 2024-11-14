import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFirstpageComponent } from './client-firstpage.component';

describe('ClientFirstpageComponent', () => {
  let component: ClientFirstpageComponent;
  let fixture: ComponentFixture<ClientFirstpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientFirstpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientFirstpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
