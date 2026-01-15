# Angular Factory Pattern Project

Projet Angular 18 pour pratiquer le refactoring avec le pattern Factory.

## Description

Ce projet contient 3 composants qui présentent tous le même problème : **des blocs massifs de if/else** pour gérer différents types d'objets :

### 1. Report Generator Component
Génère des rapports dans différents formats (PDF, Excel, CSV, JSON) pour différents types (Ventes, Inventaire, Financier, Client, Analytics).

**Problème** : 
- ~200 lignes de if/else imbriqués
- Logique de génération dupliquée
- Difficile d'ajouter un nouveau type de rapport ou format

### 2. Notification Center Component
Envoie des notifications via différents canaux (Email, SMS, Push, Slack, Webhook).

**Problème** :
- Gros bloc if/else pour chaque type de notification
- Configuration spécifique dupliquée
- Méthodes helper avec if/else (getIcon, getTitle)
- Ajout d'un nouveau canal = modifier plusieurs endroits

### 3. Dynamic Form Component
Génère des formulaires dynamiques avec différents types de champs (text, email, number, textarea, checkbox, radio, select, date, file).

**Problème** :
- Template avec *ngIf répétés pour chaque type
- Logique d'initialisation avec if/else
- Validation avec if/else pour chaque type
- Ajout d'un nouveau type de champ = beaucoup de code à modifier

## Installation

```bash
# Installer les dépendances
npm install

# Lancer l'application
npm start
# → http://localhost:4200

# Lancer les tests
npm test
```

## Structure du projet

```
src/
├── app/
│   ├── components/
│   │   ├── report-generator.component.ts      # 🔴 À refactorer
│   │   ├── notification-center.component.ts   # 🔴 À refactorer
│   │   └── dynamic-form.component.ts          # 🔴 À refactorer
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── index.html
├── main.ts
└── styles.css
```

## Le Pattern Factory

Le pattern Factory est un pattern de création qui permet de créer des objets sans spécifier leur classe exacte. Au lieu d'avoir des if/else partout, tu crées une factory qui retourne le bon type d'objet.

**Avantages** :
- ✅ Élimine les if/else répétés
- ✅ Facilite l'ajout de nouveaux types (Open/Closed Principle)
- ✅ Centralise la logique de création
- ✅ Code plus maintenable et testable

## Objectif du refactoring

Pour chaque composant, tu dois :

1. **Identifier les types** (ex: PDF, Excel, CSV, JSON pour les rapports)
2. **Créer des classes** pour chaque type
3. **Créer une Factory** qui retourne le bon type
4. **Refactorer le composant** pour utiliser la factory au lieu de if/else

## Exemple de refactoring

**Avant (avec if/else)** :
```typescript
generateReport() {
  if (this.type === 'pdf') {
    // 50 lignes de code PDF
  } else if (this.type === 'excel') {
    // 50 lignes de code Excel
  } else if (this.type === 'csv') {
    // 50 lignes de code CSV
  }
  // ... etc
}
```

**Après (avec Factory)** :
```typescript
generateReport() {
  const generator = this.reportFactory.create(this.type);
  const report = generator.generate(this.data);
  // C'est tout !
}
```

## Par où commencer ?

1. **Commence par le plus simple** : NotificationCenter (5 types seulement)
2. **Puis** : ReportGenerator (5 types × 4 formats = complexité moyenne)
3. **Enfin** : DynamicForm (9 types de champs + logique template)

## Tests

Tous les composants ont des tests. Après ton refactoring, vérifie que les tests passent toujours !

```bash
npm test
```

Tu devras peut-être adapter les tests pour tester tes nouvelles classes et factories.

## Ressources

- [Factory Pattern - Refactoring Guru](https://refactoring.guru/design-patterns/factory-method)
- [Factory Pattern en TypeScript](https://refactoring.guru/design-patterns/factory-method/typescript/example)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

## Tips

- Utilise des **interfaces** ou **classes abstraites** pour les types
- La factory peut être un **service Angular** avec `@Injectable`
- Pense à **DI (Dependency Injection)** pour injecter la factory
- N'oublie pas les **tests unitaires** pour tes nouvelles classes

Bon refactoring ! 🏭
