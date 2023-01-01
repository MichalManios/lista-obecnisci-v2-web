import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSectionsComponent } from './add-sections.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddSectionsComponent', () => {
  let component: AddSectionsComponent;
  let fixture: ComponentFixture<AddSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ AddSectionsComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
