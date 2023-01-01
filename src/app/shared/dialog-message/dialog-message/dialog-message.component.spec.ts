import { ComponentFixture, TestBed} from '@angular/core/testing';

import { DialogMessageComponent } from './dialog-message.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DialogMessageComponent', () => {
  let component: DialogMessageComponent;
  let fixture: ComponentFixture<DialogMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMessageComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
