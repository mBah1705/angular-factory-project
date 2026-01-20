import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { ComponentRef } from '@angular/core';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let componentRef: ComponentRef<SelectComponent>;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('field', { id: 'testSelect', type: 'select', label: 'Test Select', options: ['Option 1', 'Option 2'], value: '' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
