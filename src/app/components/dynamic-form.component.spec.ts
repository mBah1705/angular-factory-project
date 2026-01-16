// dynamic-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamic-form.component';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add field', () => {
    component.fieldLabel = 'Test Field';
    component.selectedFieldType = 'text';
    component.addField();
    
    expect(component.formFields.length).toBe(1);
    expect(component.formFields[0].label).toBe('Test Field');
  });

  it('should remove field', () => {
    component.fieldLabel = 'Test';
    component.addField();
    const fieldId = component.formFields[0].id;
    
    component.removeField(fieldId);
    expect(component.formFields.length).toBe(0);
  });
});
