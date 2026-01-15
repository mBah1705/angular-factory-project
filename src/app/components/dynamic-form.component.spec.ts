// report-generator.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportGeneratorComponent } from './report-generator.component';

describe('ReportGeneratorComponent', () => {
  let component: ReportGeneratorComponent;
  let fixture: ComponentFixture<ReportGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportGeneratorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate sales report', () => {
    component.selectedReportType = 'sales';
    component.selectedFormat = 'pdf';
    component.generateReport();
    
    expect(component.generatedReport).toBeTruthy();
    expect(component.generatedReport?.title).toContain('Ventes');
  });

  it('should generate different formats', () => {
    component.selectedReportType = 'sales';
    
    component.selectedFormat = 'pdf';
    component.generateReport();
    expect(component.generatedReport?.footer).toContain('PDF');
    
    component.selectedFormat = 'excel';
    component.generateReport();
    expect(component.generatedReport?.footer).toContain('Excel');
  });
});

// notification-center.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationCenterComponent } from './notification-center.component';

describe('NotificationCenterComponent', () => {
  let component: NotificationCenterComponent;
  let fixture: ComponentFixture<NotificationCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationCenterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send notification', () => {
    component.message = 'Test message';
    component.selectedType = 'email';
    component.sendNotification();
    
    expect(component.notifications.length).toBe(1);
    expect(component.notifications[0].type).toBe('email');
  });

  it('should get correct icon', () => {
    expect(component.getIcon('email')).toBe('📧');
    expect(component.getIcon('sms')).toBe('📱');
    expect(component.getIcon('push')).toBe('🔔');
  });
});

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
