import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>🏭 Angular Factory Pattern - Exercice de Refactoring</h1>
        <nav>
          <a routerLink="/reports" routerLinkActive="active">Rapports</a>
          <a routerLink="/notifications" routerLinkActive="active">Notifications</a>
          <a routerLink="/forms" routerLinkActive="active">Formulaires</a>
        </nav>
      </header>
      
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      
      <footer class="app-footer">
        <p>💡 Objectif : Refactorer le code en appliquant le pattern Factory</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .app-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .app-header h1 {
      margin: 0 0 15px 0;
      font-size: 24px;
    }
    nav {
      display: flex;
      gap: 15px;
    }
    nav a {
      color: white;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 4px;
      transition: background 0.3s;
    }
    nav a:hover, nav a.active {
      background: rgba(255,255,255,0.2);
    }
    .main-content {
      flex: 1;
      padding: 30px;
      background: #f5f5f5;
    }
    .app-footer {
      background: #333;
      color: white;
      padding: 15px;
      text-align: center;
    }
    .app-footer p {
      margin: 0;
    }
  `]
})
export class AppComponent {
  title = 'angular-factory-project';
}
