import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Format, ReportCreator, ReportFactory, ReportGeneratorInterface, ReportType } from '../report-generator/interfaces-and-classes';

export interface ReportData {
  title: string;
  content: string;
  footer: string;
  generatedAt: Date;
}

@Component({
  selector: 'app-report-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="report-generator">
      <h2>Générateur de Rapports</h2>
      
      <div class="form-group">
        <label>Type de rapport :</label>
        <select [(ngModel)]="selectedReportType" class="form-control">
          <option value="sales">Rapport de Ventes</option>
          <option value="inventory">Rapport d'Inventaire</option>
          <option value="financial">Rapport Financier</option>
          <option value="customer">Rapport Client</option>
          <option value="analytics">Rapport Analytics</option>
        </select>
      </div>

      <div class="form-group">
        <label>Format d'export :</label>
        <select [(ngModel)]="selectedFormat" class="form-control">
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>
      </div>

      <button (click)="generateReport()" class="btn-primary">
        Générer le Rapport
      </button>

      <div *ngIf="generatedReport" class="report-preview">
        <h3>Aperçu du Rapport</h3>
        <div class="report-content">
          <h4>{{ generatedReport.title }}</h4>
          <p>{{ generatedReport.content }}</p>
          <small>{{ generatedReport.footer }}</small>
          <p class="timestamp">Généré le : {{ generatedReport.generatedAt | date:'full' }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .report-generator {
      max-width: 800px;
      margin: 0 auto;
      padding: 30px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h2 {
      color: #333;
      margin-bottom: 30px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #555;
    }
    .form-control {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    .btn-primary {
      background: #2196F3;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 20px;
    }
    .btn-primary:hover {
      background: #1976D2;
    }
    .report-preview {
      margin-top: 30px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 4px;
      border-left: 4px solid #2196F3;
    }
    .report-content {
      background: white;
      padding: 20px;
      border-radius: 4px;
      margin-top: 15px;
    }
    .timestamp {
      color: #999;
      font-size: 12px;
      margin-top: 15px;
    }
  `]
})
export class ReportGeneratorComponent extends ReportCreator {
  reportFactory = inject(ReportFactory)

  createReport(type: ReportType): ReportGeneratorInterface {
    return this.reportFactory.createReport(type);
  }
}
