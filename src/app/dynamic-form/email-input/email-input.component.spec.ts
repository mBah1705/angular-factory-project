import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailInputComponent } from './email-input.component';
import { ComponentRef } from '@angular/core';

describe('EmailInputComponent', () => {
  let component: EmailInputComponent;
  let componentRef: ComponentRef<EmailInputComponent>;
  let fixture: ComponentFixture<EmailInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailInputComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('field', { id: 'testEmail', type: 'email', label: 'Test Email', value: '' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
