import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxInputComponent } from './checkbox-input.component';
import { ComponentRef } from '@angular/core';

describe('CheckboxInputComponent', () => {
  let component: CheckboxInputComponent;
  let componentRef: ComponentRef<CheckboxInputComponent>;
  let fixture: ComponentFixture<CheckboxInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxInputComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('field', { id: 'testCheckbox', type: 'checkbox', label: 'Test Checkbox', value: false });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
