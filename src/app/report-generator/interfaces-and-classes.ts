import { inject, Injectable } from "@angular/core";
import { ReportData } from "../components/report-generator.component";

export type Format = 'pdf' | 'excel' | 'csv' | 'json';
export type ReportType = 'sales' | 'inventory' | 'financial' | 'customer' | 'analytics';

interface ReportGeneratorFactory {
    createTitle(): string;
    createContent(format: Format): string;
    createFooter(format: Format): string;
}

export interface ReportGeneratorInterface {
    generateReport(format: Format): ReportData;
}

abstract class Report {
    title = '';
    content = '';
    footer = '';

    abstract generateReport(format: Format): ReportData;
}

@Injectable({
    providedIn: 'root'
})
class SalesReportGeneratorFactory implements ReportGeneratorFactory {
    createTitle(): string {
        return 'Rapport de Ventes - Trimestre 4';
    }
    createContent(format: Format): string {
        return new SalesContent(format).getContent();
    }
    createFooter(format: Format): string {
        return new SalesFooter(format).getFooter();
    }
}

@Injectable({
    providedIn: 'root'
})
class InventoryReportGeneratorFactory implements ReportGeneratorFactory {
    createTitle(): string {
        return 'Rapport d\'Inventaire - Janvier 2026';
    }
    createContent(format: Format): string {
        return new InventoryContent(format).getContent();
    }
    createFooter(format: Format): string {
        return new InventoryFooter(format).getFooter();
    }
}

@Injectable({
    providedIn: 'root'
})
class FinancialReportGeneratorFactory implements ReportGeneratorFactory {
    createTitle(): string {
        return 'Rapport Financier Annuel 2025';
    }
    createContent(format: Format): string {
        return new FinancialContent(format).getContent();
    }
    createFooter(format: Format): string {
        return new FinancialFooter(format).getFooter();
    }
}

@Injectable({
    providedIn: 'root'
})
class CustomerReportGeneratorFactory implements ReportGeneratorFactory {
    createTitle(): string {
        return 'Rapport Clients - Base Active';
    }
    createContent(format: Format): string {
        return new CustomerContent(format).getContent();
    }
    createFooter(format: Format): string {
        return new CustomerFooter(format).getFooter();
    }
}

@Injectable({
    providedIn: 'root'
})
class AnalyticsReportGeneratorFactory implements ReportGeneratorFactory {
    createTitle(): string {
        return 'Rapport Analytics - Performance Web';
    }
    createContent(format: Format): string {
        return new AnalyticsContent(format).getContent();
    }
    createFooter(format: Format): string {
        return new AnalyticsFooter(format).getFooter();
    }
}

class SalesReport extends Report {
    reportGeneratorFactory = new SalesReportGeneratorFactory();

    generateReport(format: Format): ReportData {
        this.title = this.reportGeneratorFactory.createTitle();
        this.content = this.reportGeneratorFactory.createContent(format);
        this.footer = this.reportGeneratorFactory.createFooter(format);

        return { title: this.title, content: this.content, footer: this.footer, generatedAt: new Date() };
    }
}

class InventoryReport extends Report {
    reportGeneratorFactory = new InventoryReportGeneratorFactory();

    generateReport(format: Format): ReportData {
        this.title = this.reportGeneratorFactory.createTitle();
        this.content = this.reportGeneratorFactory.createContent(format);
        this.footer = this.reportGeneratorFactory.createFooter(format);
        return { title: this.title, content: this.content, footer: this.footer, generatedAt: new Date() };
    }
}

class FinancialReport extends Report {
    reportGeneratorFactory = new FinancialReportGeneratorFactory();

    generateReport(format: Format): ReportData {
        this.title = this.reportGeneratorFactory.createTitle();
        this.content = this.reportGeneratorFactory.createContent(format);
        this.footer = this.reportGeneratorFactory.createFooter(format);
        return { title: this.title, content: this.content, footer: this.footer, generatedAt: new Date() };
    }
}

class CustomerReport extends Report {
    reportGeneratorFactory = new CustomerReportGeneratorFactory();
    generateReport(format: Format): ReportData {
        this.title = this.reportGeneratorFactory.createTitle();
        this.content = this.reportGeneratorFactory.createContent(format);
        this.footer = this.reportGeneratorFactory.createFooter(format);
        return { title: this.title, content: this.content, footer: this.footer, generatedAt: new Date() };
    }
}

class AnalyticsReport extends Report {
    reportGeneratorFactory = new AnalyticsReportGeneratorFactory();
    generateReport(format: Format): ReportData {
        this.title = this.reportGeneratorFactory.createTitle();
        this.content = this.reportGeneratorFactory.createContent(format);
        this.footer = this.reportGeneratorFactory.createFooter(format);
        return { title: this.title, content: this.content, footer: this.footer, generatedAt: new Date() };
    }
}

export abstract class ReportCreator {
    selectedReportType: ReportType = 'sales';
    selectedFormat: Format = 'pdf';
    generatedReport: ReportData | null = null;
    
    abstract createReport(type: ReportType): ReportGeneratorInterface;

    generateReport(): void {
        const reportGenerator = this.createReport(this.selectedReportType);
        this.generatedReport = reportGenerator.generateReport(this.selectedFormat);
    }
}

@Injectable({
    providedIn: 'root'
})
export class ReportFactory extends ReportCreator {
     createReport(type: ReportType): ReportGeneratorInterface {
        switch(type) {
            case 'sales':
                return new SalesReport();
            case 'inventory':
                return new InventoryReport();
            case 'financial':
                return new FinancialReport();
            case 'customer':
                return new CustomerReport();
            case 'analytics':
                return new AnalyticsReport();
            default:
                throw new Error(`Report type ${type} not supported.`);
        }
    }
}

interface ReportContent {
    format: Format;
    getContent(): string;
}

class SalesContent implements ReportContent {
    format: Format;

    constructor(format: Format) {
        this.format = format;
    }

    getContent(): string {
        switch(this.format) {
            case 'pdf':
                return `Ventes totales: 125,000€
Nombre de transactions: 450
Produit le plus vendu: Produit A (35%)
Croissance: +15% par rapport au trimestre précédent

Détails par région:
- Nord: 45,000€
- Sud: 32,000€
- Est: 28,000€
- Ouest: 20,000€`;
            case 'excel':
                return `Données exportables vers Excel:
Colonnes: Date, Produit, Quantité, Montant, Région
Nombre de lignes: 450
Feuilles: Ventes, Statistiques, Graphiques
Formules: SOMME, MOYENNE, MAX, MIN intégrées`;
            case 'csv':
                return `Format CSV simple:
date;produit;quantite;montant;region
2024-01-15;Produit A;25;1250;Nord
2024-01-16;Produit B;18;900;Sud
... (447 autres lignes)`;
            case 'json':
                return `{
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
        }
    }
}

class InventoryContent implements ReportContent {
    format: Format;

    constructor(format: Format) {
        this.format = format;
    }

    getContent(): string {
        switch(this.format) {
            case 'pdf':
                return `Stock total: 15,420 unités
Valeur totale: 285,000€
Articles en rupture: 12
Articles en surstock: 8

Top 5 articles:
1. Produit Alpha - 2,500 unités
2. Produit Beta - 1,800 unités
3. Produit Gamma - 1,200 unités
4. Produit Delta - 950 unités
5. Produit Epsilon - 820 unités`;
            case 'excel':
                return `Feuilles Excel:
- Vue d'ensemble: Stock par catégorie
- Détails: Liste complète des articles
- Alertes: Ruptures et surstock
- Valorisation: Prix et valeurs
Graphiques: 5 graphiques automatiques inclus`;
            case 'csv':
                return `sku;nom;quantite;prix_unitaire;categorie;emplacement
SKU001;Produit Alpha;2500;25.00;Cat A;A-12
SKU002;Produit Beta;1800;35.50;Cat B;B-05
... (320 autres articles)`;
            case 'json':
                return `{
  "snapshot_date": "2026-01-15",
  "total_items": 15420,
  "total_value": 285000,
  "out_of_stock": 12,
  "overstock": 8,
  "items": [...]
}`;
        }
    }
}

class FinancialContent implements ReportContent {
    format: Format;

    constructor(format: Format) {
        this.format = format;
    }

    getContent(): string {
        switch(this.format) {
            case 'pdf':
                return `Chiffre d'affaires: 1,250,000€
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
            case 'excel':
                return `Fichier Excel financier:
Feuilles: Compte de résultat, Bilan, Flux de trésorerie
Tableaux de bord: 8 indicateurs clés
Graphiques: Évolution mensuelle, Répartition charges
Consolidation: Multi-entités si applicable`;
            case 'csv':
                return `compte;libelle;debit;credit;solde
601;Achats;450000;0;-450000
701;Ventes;0;1250000;1250000
... (125 lignes de comptes)`;
            case 'json':
                return `{
  "fiscal_year": 2025,
  "revenue": 1250000,
  "expenses": 890000,
  "net_income": 360000,
  "margin": 28.8,
  "balance_sheet": {...},
  "ratios": {...}
}`;
        }
    }
}

class CustomerContent implements ReportContent {
    format: Format;

    constructor(format: Format) {
        this.format = format;
    }
    
    getContent(): string {
        switch(this.format) {
            case 'pdf':
                return `Clients actifs: 1,250
Nouveaux clients (12 mois): 320
Taux de rétention: 87%
Panier moyen: 280€

Segmentation:
- Premium: 180 clients (42% CA)
- Standard: 650 clients (38% CA)
- Occasionnel: 420 clients (20% CA)

NPS Score: 68 (Excellent)`;
            case 'excel':
                return `Base clients Excel:
Colonnes: ID, Nom, Email, Segment, CA, Dernière commande
Filtres avancés et segments
Graphiques: Répartition géographique, Évolution
Macro VBA: Export mailings`;
            case 'csv':
                return `customer_id;name;email;segment;total_spent;last_order
C001;Jean Dupont;j.dupont@example.com;Premium;15200;2026-01-10
C002;Marie Martin;m.martin@example.com;Standard;3400;2026-01-12
... (1,248 autres clients)`;
            case 'json':
                return `{
  "total_customers": 1250,
  "active_customers": 1180,
  "new_customers_12m": 320,
  "retention_rate": 87,
  "segments": {...},
  "nps_score": 68
}`;
        }
    }
}

class AnalyticsContent implements ReportContent {
    format: Format;

    constructor(format: Format) {
        this.format = format;
    }

    getContent(): string {
        switch(this.format) {
            case 'pdf':
                return `Visiteurs uniques: 45,200
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
            case 'excel':
                return `Dashboard Excel Analytics:
Feuilles: Vue d'ensemble, Sources, Conversions, Comportement
KPIs: 15 métriques principales
Graphiques: Tendances temporelles
Segments: Mobile vs Desktop, Nouveaux vs Récurrents`;
            case 'csv':
                return `date;page;views;unique_visitors;avg_time;bounce_rate
2026-01-01;/home;850;720;00:03:15;38
2026-01-01;/products;420;380;00:04:20;35
... (930 autres lignes)`;
            case 'json':
                return `{
  "period": "30d",
  "unique_visitors": 45200,
  "pageviews": 128500,
  "bounce_rate": 42,
  "avg_session": "3m25s",
  "traffic_sources": {...},
  "top_pages": [...]
}`;        }
    }
}

interface ReportFooter {
    format: Format;
    getFooter(): string;
}

class SalesFooter implements ReportFooter {
    format: Format;

    constructor(format: Format) {
        this.format = format;
    }

    getFooter(): string {
        switch(this.format) {
            case 'pdf':
                return 'Document confidentiel - Format PDF';
            case 'excel':
                return 'Fichier Excel avec macros - Format XLSX';
            case 'csv':
                return 'Fichier CSV - Encodage UTF-8';
            case 'json':
                return 'Format JSON - API compatible';
        }
    }
}

class InventoryFooter implements ReportFooter {
    format: Format;

    constructor(format: Format) {
        this.format = format;
    }

    getFooter(): string {
        switch(this.format) {
            case 'pdf':
                return 'Rapport d\'inventaire PDF - Confidentiel';
            case 'excel':
                return 'Excel avec tableaux croisés dynamiques';
            case 'csv':
                return 'CSV Export - Inventaire complet';
            case 'json':
                return 'JSON API - Inventaire';
        }
    }
}

class FinancialFooter implements ReportFooter {
    format: Format;

    constructor(format: Format) {
        this.format = format;
    }
    
    getFooter(): string {
        switch(this.format) {
            case 'pdf':
                return 'Document certifié - Expert comptable';
            case 'excel':
                return 'Excel Financier - Formules auditées';
            case 'csv':
                return 'Grand livre - Format CSV';
            case 'json':
                return 'API Financière JSON';
        }
    }
}

class CustomerFooter implements ReportFooter {
    format: Format;

    constructor(format: Format) {
        this.format = format;
    }

    getFooter(): string {
        switch(this.format) {
            case 'pdf':
                return 'Rapport CRM - Données agrégées';
            case 'excel':
                return 'Excel CRM - Données personnelles RGPD';
            case 'csv':
                return 'Export CSV - Conforme RGPD';
            case 'json':
                return 'API Clients JSON';
        }
    }
}

class AnalyticsFooter implements ReportFooter {
    format: Format;

    constructor(format: Format) {
        this.format = format;
    }

    getFooter(): string {
        switch(this.format) {
            case 'pdf':
                return 'Google Analytics - Période 30j';
            case 'excel':
                return 'Excel Analytics - Données web';
            case 'csv':
                return 'Raw data CSV - Analytics';
            case 'json':
                return 'JSON Analytics API';
        }
    }
}