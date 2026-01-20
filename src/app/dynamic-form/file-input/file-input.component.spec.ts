import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInputComponent } from './file-input.component';
import { ComponentRef } from '@angular/core';

describe('FileInputComponent', () => {
  let component: FileInputComponent;
  let componentRef: ComponentRef<FileInputComponent>;
  let fixture: ComponentFixture<FileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileInputComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('field', { id: 'testFile', type: 'file', label: 'Test File', value: null });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
