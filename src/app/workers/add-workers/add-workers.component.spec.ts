import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkersComponent } from './add-workers.component';

describe('AddWorkersComponent', () => {
  let component: AddWorkersComponent;
  let fixture: ComponentFixture<AddWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
