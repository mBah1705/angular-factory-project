# Instructions - Pattern Factory

## 🎯 Objectif

Refactorer 3 composants Angular qui utilisent des if/else massifs en appliquant le **pattern Factory**.

## 📚 Qu'est-ce que le pattern Factory ?

Le pattern Factory est un **pattern de création** qui fournit une interface pour créer des objets sans spécifier leur classe exacte.

### Principe de base

Au lieu de :
```typescript
if (type === 'A') {
  return new TypeA();
} else if (type === 'B') {
  return new TypeB();
}
```

Tu fais :
```typescript
const factory = new ObjectFactory();
return factory.create(type);
```

## 🔍 Analyse des problèmes

### Composant 1 : Report Generator
**Problème** : ~200 lignes de if/else pour gérer 5 types × 4 formats = 20 combinaisons

**Ce qui doit être refactoré** :
- Logique de génération dupliquée
- Configuration spécifique à chaque format
- Impossible d'ajouter un format sans modifier le code existant

### Composant 2 : Notification Center
**Problème** : Blocs if/else répétés + méthodes helper

**Ce qui doit être refactoré** :
- Logique d'envoi pour chaque canal (Email, SMS, Push, Slack, Webhook)
- Méthodes getIcon() et getTitle() avec if/else
- Configuration spécifique dupliquée

### Composant 3 : Dynamic Form
**Problème** : Template avec *ngIf répétés + logique d'initialisation et validation

**Ce qui doit être refactoré** :
- Logique d'initialisation des champs (addField)
- Template avec 9 blocs *ngIf
- Validation dans submitForm avec if/else

## 📝 Plan de refactoring suggéré

### Étape 1 : Créer les interfaces

Pour chaque composant, définis l'interface commune :

```typescript
// Exemple pour les notifications
interface NotificationSender {
  send(message: string): void;
  getIcon(): string;
  getTitle(): string;
}
```

### Étape 2 : Créer les classes concrètes

Une classe par type :

```typescript
class EmailSender implements NotificationSender {
  send(message: string): void {
    console.log('📧 Envoi email...');
    // Logique spécifique email
  }
  
  getIcon(): string {
    return '📧';
  }
  
  getTitle(): string {
    return 'Email';
  }
}

class SmsSender implements NotificationSender {
  // ... même structure
}
```

### Étape 3 : Créer la Factory

```typescript
@Injectable({ providedIn: 'root' })
export class NotificationFactory {
  create(type: string): NotificationSender {
    switch(type) {
      case 'email': return new EmailSender();
      case 'sms': return new SmsSender();
      // ... autres types
      default: throw new Error(`Type inconnu: ${type}`);
    }
  }
}
```

**Note** : Oui, il y a encore un switch/if, mais :
- ✅ C'est centralisé en UN seul endroit
- ✅ Facile d'ajouter un nouveau type
- ✅ La logique métier est dans les classes, pas dans les if/else

### Étape 4 : Refactorer le composant

```typescript
export class NotificationCenterComponent {
  constructor(private factory: NotificationFactory) {}
  
  sendNotification() {
    const sender = this.factory.create(this.selectedType);
    sender.send(this.message);
    
    this.notifications.unshift({
      id: this.idCounter++,
      type: this.selectedType,
      message: this.message,
      icon: sender.getIcon(),
      title: sender.getTitle(),
      timestamp: new Date()
    });
  }
  
  // Plus besoin de getIcon() et getTitle() avec if/else !
}
```

## 🚀 Ordre de refactoring recommandé

### 1️⃣ Notification Center (2-3 heures)
**Pourquoi commencer par là** :
- Le plus simple : 5 types, logique similaire
- Bon pour comprendre le pattern
- Résultat visible rapidement

**Checklist** :
- [ ] Créer `NotificationSender` interface
- [ ] Créer 5 classes : EmailSender, SmsSender, PushSender, SlackSender, WebhookSender
- [ ] Créer `NotificationFactory` service
- [ ] Refactorer `sendNotification()`
- [ ] Supprimer `getIcon()` et `getTitle()`
- [ ] Tester que tout fonctionne

### 2️⃣ Report Generator (3-4 heures)
**Plus complexe** : 2 dimensions (type + format)

**Approche suggérée** :
- Option A : Factory pour les types, chaque type gère ses formats
- Option B : Factory pour les formats, chaque format gère les types
- Option C : Abstract Factory (avancé) avec 2 factories

**Checklist** :
- [ ] Définir l'architecture (A, B ou C)
- [ ] Créer les interfaces
- [ ] Créer les classes concrètes
- [ ] Créer la/les factory(ies)
- [ ] Refactorer `generateReport()`
- [ ] Tester tous les types × formats

### 3️⃣ Dynamic Form (4-5 heures)
**Le plus complexe** : Template + logique + validation

**Défis spécifiques** :
- Le template Angular a des *ngIf répétés
- Logique d'initialisation différente par type
- Validation différente par type

**Approche suggérée** :
- Créer des classes pour chaque type de champ
- Chaque classe sait comment s'initialiser et se valider
- Utiliser `NgComponentOutlet` ou `*ngComponentOutlet` pour le rendu dynamique

**Checklist** :
- [ ] Créer `FormField` interface
- [ ] Créer 9 classes de champs (TextField, EmailField, etc.)
- [ ] Créer `FormFieldFactory`
- [ ] Refactorer `addField()`
- [ ] Refactorer le template (remplacer les *ngIf)
- [ ] Refactorer `submitForm()`
- [ ] Tester tous les types de champs

## 💡 Tips avancés

### Utiliser l'injection de dépendances

```typescript
// Au lieu de new dans la factory
@Injectable({ providedIn: 'root' })
export class NotificationFactory {
  constructor(private injector: Injector) {}
  
  create(type: string): NotificationSender {
    switch(type) {
      case 'email': return this.injector.get(EmailSender);
      // ...
    }
  }
}
```

### Pattern Registry (alternative avancée)

```typescript
@Injectable({ providedIn: 'root' })
export class NotificationFactory {
  private registry = new Map<string, Type<NotificationSender>>();
  
  register(type: string, senderClass: Type<NotificationSender>) {
    this.registry.set(type, senderClass);
  }
  
  create(type: string): NotificationSender {
    const SenderClass = this.registry.get(type);
    if (!SenderClass) throw new Error(`Type inconnu: ${type}`);
    return new SenderClass();
  }
}

// Dans l'initialisation
factory.register('email', EmailSender);
factory.register('sms', SmsSender);
```

### Abstract Factory (pour Report Generator)

Si tu veux aller plus loin, tu peux implémenter l'Abstract Factory :
- Une factory pour créer les générateurs de rapports
- Une factory pour créer les exporteurs de formats
- Les deux travaillent ensemble

## 🧪 Tests

Après chaque refactoring, vérifie :

```bash
npm test
```

Tu devras créer des tests pour :
- [ ] Chaque classe concrète (EmailSender, etc.)
- [ ] Chaque factory
- [ ] Le composant refactoré

Exemple de test :
```typescript
describe('EmailSender', () => {
  it('should send email', () => {
    const sender = new EmailSender();
    spyOn(console, 'log');
    sender.send('Test message');
    expect(console.log).toHaveBeenCalledWith(jasmine.stringContaining('email'));
  });
  
  it('should return correct icon', () => {
    const sender = new EmailSender();
    expect(sender.getIcon()).toBe('📧');
  });
});
```

## 📊 Métriques de succès

Après le refactoring, tu devrais avoir :

**Notification Center** :
- ❌ ~150 lignes avec if/else
- ✅ ~50 lignes dans le composant + classes séparées
- ✅ Facile d'ajouter un nouveau canal (1 nouvelle classe)

**Report Generator** :
- ❌ ~250 lignes avec if/else imbriqués
- ✅ ~80 lignes dans le composant + classes séparées
- ✅ Ajout d'un format = 1 nouvelle classe

**Dynamic Form** :
- ❌ Template complexe avec 9 blocs *ngIf
- ❌ ~200 lignes de logique avec if/else
- ✅ Template simplifié avec composant dynamique
- ✅ ~60 lignes dans le composant + classes séparées

## ❓ Questions fréquentes

**Q: La factory a encore un switch/if, c'est pas pareil ?**
R: Non ! Le switch est centralisé en UN endroit et ne contient que la création. Toute la logique métier est dans les classes.

**Q: C'est pas du over-engineering ?**
R: Pour 2-3 types, peut-être. Pour 5+ types avec logique complexe, c'est indispensable pour la maintenabilité.

**Q: Comment tester la factory ?**
R: Test simple : `expect(factory.create('email')).toBeInstanceOf(EmailSender);`

**Q: Ça marche avec les services Angular ?**
R: Oui ! Les classes peuvent être des services injectables. Utilise l'Injector dans la factory.

## 🎓 Pour aller plus loin

Une fois le refactoring terminé, tu peux :
- Ajouter de nouveaux types facilement (test ton architecture !)
- Implémenter le pattern Strategy en combinaison
- Créer des composites (combinaison de plusieurs types)
- Ajouter des décorateurs (pattern Decorator) pour enrichir les objets

Bon courage ! 🏭
