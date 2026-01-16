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
