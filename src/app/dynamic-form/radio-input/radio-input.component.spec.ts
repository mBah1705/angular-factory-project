import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioInputComponent } from './radio-input.component';
import { ComponentRef } from '@angular/core';

describe('RadioInputComponent', () => {
  let component: RadioInputComponent;
  let componentRef: ComponentRef<RadioInputComponent>;
  let fixture: ComponentFixture<RadioInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioInputComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('field', { id: 'testRadio', type: 'radio', label: 'Test Radio', options: ['Option 1', 'Option 2'], value: '' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
