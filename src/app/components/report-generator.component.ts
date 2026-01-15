import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ReportData {
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
export class ReportGeneratorComponent {
  selectedReportType: string = 'sales';
  selectedFormat: string = 'pdf';
  generatedReport: ReportData | null = null;

  generateReport() {
    // PROBLÈME: Énorme bloc de if/else imbriqués
    // Difficile à maintenir, à étendre, à tester
    
    let title = '';
    let content = '';
    let footer = '';

    // Génération du contenu selon le type de rapport
    if (this.selectedReportType === 'sales') {
      title = 'Rapport de Ventes - Trimestre 4';
      
      if (this.selectedFormat === 'pdf') {
        content = `Ventes totales: 125,000€
Nombre de transactions: 450
Produit le plus vendu: Produit A (35%)
Croissance: +15% par rapport au trimestre précédent

Détails par région:
- Nord: 45,000€
- Sud: 32,000€
- Est: 28,000€
- Ouest: 20,000€`;
        footer = 'Document confidentiel - Format PDF';
      } else if (this.selectedFormat === 'excel') {
        content = `Données exportables vers Excel:
Colonnes: Date, Produit, Quantité, Montant, Région
Nombre de lignes: 450
Feuilles: Ventes, Statistiques, Graphiques
Formules: SOMME, MOYENNE, MAX, MIN intégrées`;
        footer = 'Fichier Excel avec macros - Format XLSX';
      } else if (this.selectedFormat === 'csv') {
        content = `Format CSV simple:
date;produit;quantite;montant;region
2024-01-15;Produit A;25;1250;Nord
2024-01-16;Produit B;18;900;Sud
... (447 autres lignes)`;
        footer = 'Fichier CSV - Encodage UTF-8';
      } else if (this.selectedFormat === 'json') {
        content = `{
  "period": "Q4-2024",
  "total_sales": 125000,
  "transactions": 450,
  "top_product": "Produit A",
  "growth": 15,
  "regions": {
    "north": 45000,
    "south": 32000,
    "east": 28000,
    "west": 20000
  }
}`;
        footer = 'Format JSON - API compatible';
      }
      
    } else if (this.selectedReportType === 'inventory') {
      title = 'Rapport d\'Inventaire - Janvier 2026';
      
      if (this.selectedFormat === 'pdf') {
        content = `Stock total: 15,420 unités
Valeur totale: 285,000€
Articles en rupture: 12
Articles en surstock: 8

Top 5 articles:
1. Produit Alpha - 2,500 unités
2. Produit Beta - 1,800 unités
3. Produit Gamma - 1,200 unités
4. Produit Delta - 950 unités
5. Produit Epsilon - 820 unités`;
        footer = 'Rapport d\'inventaire PDF - Confidentiel';
      } else if (this.selectedFormat === 'excel') {
        content = `Feuilles Excel:
- Vue d'ensemble: Stock par catégorie
- Détails: Liste complète des articles
- Alertes: Ruptures et surstock
- Valorisation: Prix et valeurs
Graphiques: 5 graphiques automatiques inclus`;
        footer = 'Excel avec tableaux croisés dynamiques';
      } else if (this.selectedFormat === 'csv') {
        content = `sku;nom;quantite;prix_unitaire;categorie;emplacement
SKU001;Produit Alpha;2500;25.00;Cat A;A-12
SKU002;Produit Beta;1800;35.50;Cat B;B-05
... (320 autres articles)`;
        footer = 'CSV Export - Inventaire complet';
      } else if (this.selectedFormat === 'json') {
        content = `{
  "snapshot_date": "2026-01-15",
  "total_items": 15420,
  "total_value": 285000,
  "out_of_stock": 12,
  "overstock": 8,
  "items": [...]
}`;
        footer = 'JSON API - Inventaire';
      }
      
    } else if (this.selectedReportType === 'financial') {
      title = 'Rapport Financier Annuel 2025';
      
      if (this.selectedFormat === 'pdf') {
        content = `Chiffre d'affaires: 1,250,000€
Charges: 890,000€
Résultat net: 360,000€
Marge: 28.8%

Bilan:
- Actif: 2,150,000€
- Passif: 1,320,000€
- Capitaux propres: 830,000€

Ratios:
- ROE: 43.4%
- ROI: 32.1%`;
        footer = 'Document certifié - Expert comptable';
      } else if (this.selectedFormat === 'excel') {
        content = `Fichier Excel financier:
Feuilles: Compte de résultat, Bilan, Flux de trésorerie
Tableaux de bord: 8 indicateurs clés
Graphiques: Évolution mensuelle, Répartition charges
Consolidation: Multi-entités si applicable`;
        footer = 'Excel Financier - Formules auditées';
      } else if (this.selectedFormat === 'csv') {
        content = `compte;libelle;debit;credit;solde
601;Achats;450000;0;-450000
701;Ventes;0;1250000;1250000
... (125 lignes de comptes)`;
        footer = 'Grand livre - Format CSV';
      } else if (this.selectedFormat === 'json') {
        content = `{
  "fiscal_year": 2025,
  "revenue": 1250000,
  "expenses": 890000,
  "net_income": 360000,
  "margin": 28.8,
  "balance_sheet": {...},
  "ratios": {...}
}`;
        footer = 'API Financière JSON';
      }
      
    } else if (this.selectedReportType === 'customer') {
      title = 'Rapport Clients - Base Active';
      
      if (this.selectedFormat === 'pdf') {
        content = `Clients actifs: 1,250
Nouveaux clients (12 mois): 320
Taux de rétention: 87%
Panier moyen: 280€

Segmentation:
- Premium: 180 clients (42% CA)
- Standard: 650 clients (38% CA)
- Occasionnel: 420 clients (20% CA)

NPS Score: 68 (Excellent)`;
        footer = 'Rapport CRM - Données agrégées';
      } else if (this.selectedFormat === 'excel') {
        content = `Base clients Excel:
Colonnes: ID, Nom, Email, Segment, CA, Dernière commande
Filtres avancés et segments
Graphiques: Répartition géographique, Évolution
Macro VBA: Export mailings`;
        footer = 'Excel CRM - Données personnelles RGPD';
      } else if (this.selectedFormat === 'csv') {
        content = `customer_id;name;email;segment;total_spent;last_order
C001;Jean Dupont;j.dupont@example.com;Premium;15200;2026-01-10
C002;Marie Martin;m.martin@example.com;Standard;3400;2026-01-12
... (1,248 autres clients)`;
        footer = 'Export CSV - Conforme RGPD';
      } else if (this.selectedFormat === 'json') {
        content = `{
  "total_customers": 1250,
  "active_customers": 1180,
  "new_customers_12m": 320,
  "retention_rate": 87,
  "segments": {...},
  "nps_score": 68
}`;
        footer = 'API Clients JSON';
      }
      
    } else if (this.selectedReportType === 'analytics') {
      title = 'Rapport Analytics - Performance Web';
      
      if (this.selectedFormat === 'pdf') {
        content = `Visiteurs uniques: 45,200
Pages vues: 128,500
Taux de rebond: 42%
Durée moyenne session: 3m 25s

Sources de trafic:
- Organique: 55%
- Direct: 25%
- Réseaux sociaux: 12%
- Publicité: 8%

Pages populaires:
1. Accueil - 28,400 vues
2. Produits - 18,200 vues
3. Blog - 12,800 vues`;
        footer = 'Google Analytics - Période 30j';
      } else if (this.selectedFormat === 'excel') {
        content = `Dashboard Excel Analytics:
Feuilles: Vue d'ensemble, Sources, Conversions, Comportement
KPIs: 15 métriques principales
Graphiques: Tendances temporelles
Segments: Mobile vs Desktop, Nouveaux vs Récurrents`;
        footer = 'Excel Analytics - Données web';
      } else if (this.selectedFormat === 'csv') {
        content = `date;page;views;unique_visitors;avg_time;bounce_rate
2026-01-01;/home;850;720;00:03:15;38
2026-01-01;/products;420;380;00:04:20;35
... (930 autres lignes)`;
        footer = 'Raw data CSV - Analytics';
      } else if (this.selectedFormat === 'json') {
        content = `{
  "period": "30d",
  "unique_visitors": 45200,
  "pageviews": 128500,
  "bounce_rate": 42,
  "avg_session": "3m25s",
  "traffic_sources": {...},
  "top_pages": [...]
}`;
        footer = 'JSON Analytics API';
      }
    }

    this.generatedReport = {
      title,
      content,
      footer,
      generatedAt: new Date()
    };
  }
}
