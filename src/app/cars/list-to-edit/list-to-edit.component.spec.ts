import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListToEditComponent } from './list-to-edit.component';

describe('ListToEditComponent', () => {
  let component: ListToEditComponent;
  let fixture: ComponentFixture<ListToEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListToEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListToEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
