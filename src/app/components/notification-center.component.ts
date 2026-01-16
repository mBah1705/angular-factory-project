import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Notification {
  id: number;
  type: string;
  message: string;
  icon: string;
  title: string;
  timestamp: Date;
}

interface NotificationSender {
  sendNotification(message: string): {success: boolean, deliveryInfo: string};
  getIcon(): string;
  getTitle(): string;
}


// Abstract Creator for NotificationCenter
abstract class NotificationCreator {
  selectedType: string = 'email';
  message: string = '';
  notifications: Notification[] = [];
  protected idCounter = 1;
  abstract createSender(type: string): NotificationSender;
  
  sendNotification(): void {
    if (!this.message.trim()) {
      alert('Veuillez entrer un message');
      return;
    }
    const sender = this.createSender(this.selectedType);
    const {success, deliveryInfo} = sender.sendNotification(this.message);

    if (success) {
      this.notifications.unshift({
        id: this.idCounter++,
        type: this.selectedType,
        message: `${this.message} - ${deliveryInfo}`,
        icon: sender.getIcon(),
        title: sender.getTitle(),
        timestamp: new Date()
      });
      this.message = '';
    }
  }
}

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="notification-center">
      <h2>Centre de Notifications</h2>
      
      <div class="notification-form">
        <select [(ngModel)]="selectedType" class="form-control">
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="push">Push Notification</option>
          <option value="slack">Slack</option>
          <option value="webhook">Webhook</option>
        </select>
        
        <input 
          [(ngModel)]="message" 
          placeholder="Message à envoyer"
          class="form-control"
        />
        
        <button (click)="sendNotification()" class="btn-send">
          Envoyer
        </button>
      </div>

      <div class="notifications-list">
        <h3>Notifications envoyées</h3>
        <div *ngFor="let notif of notifications" 
             class="notification-item"
             [ngClass]="'type-' + notif.type">
          <div class="notif-icon">{{ notif.icon }}</div>
          <div class="notif-content">
            <strong>{{ notif.title }}</strong>
            <p>{{ notif.message }}</p>
            <small>{{ notif.timestamp | date:'short' }}</small>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notification-center {
      max-width: 700px;
      margin: 0 auto;
      padding: 30px;
    }
    .notification-form {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
    }
    .form-control {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    input.form-control {
      flex: 1;
    }
    .btn-send {
      background: #4CAF50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .notifications-list {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .notification-item {
      display: flex;
      gap: 15px;
      padding: 15px;
      margin: 10px 0;
      border-radius: 4px;
      border-left: 4px solid #ccc;
    }
    .notification-item.type-email {
      background: #E3F2FD;
      border-left-color: #2196F3;
    }
    .notification-item.type-sms {
      background: #F3E5F5;
      border-left-color: #9C27B0;
    }
    .notification-item.type-push {
      background: #FFF3E0;
      border-left-color: #FF9800;
    }
    .notification-item.type-slack {
      background: #E8F5E9;
      border-left-color: #4CAF50;
    }
    .notification-item.type-webhook {
      background: #FBE9E7;
      border-left-color: #FF5722;
    }
    .notif-icon {
      font-size: 32px;
    }
    .notif-content {
      flex: 1;
    }
    .notif-content strong {
      display: block;
      margin-bottom: 5px;
    }
    .notif-content p {
      margin: 5px 0;
    }
    .notif-content small {
      color: #666;
    }
  `]
})
export class NotificationCenterComponent extends NotificationCreator {
  constructor(private notificationFactory: NotificationFactory) {
    super();
  }

  // private notificationFactory: NotificationFactory = new NotificationFactory();

  createSender(type: string): NotificationSender {
    return this.notificationFactory.createSender(type);
  }
}

@Injectable({
  providedIn: 'root'
})
export class NotificationFactory {
  createSender(type: string): NotificationSender {
    switch (type) {
      case 'email':
        return new EmailSender();
      case 'sms':
        return new SmsSender();
      case 'push':
        return new PushSender();
      case 'slack':
        return new SlackSender();
      case 'webhook':
        return new WebhookSender();
      default:
        throw new Error('Type de notification non supporté');
    }
  }
}

// Concrete classes creation implementing NotificationSender interface
class EmailSender implements NotificationSender {
  sendNotification(message: string): {success: boolean, deliveryInfo: string} {
    let success = false;
    let deliveryInfo = '';

    // Logique spécifique Email
      console.log('📧 Envoi d\'un email...');
      const emailConfig = {
        from: 'noreply@example.com',
        to: 'user@example.com',
        subject: 'Notification',
        body: message,
        html: `<p>${message}</p>`,
        priority: 'normal'
      };
      console.log('Configuration email:', emailConfig);
      
      // Simulation d'envoi SMTP
      const smtpServer = 'smtp.example.com:587';
      const authenticated = true;
      
      if (authenticated) {
        console.log(`Connexion à ${smtpServer}`);
        console.log('Email envoyé avec succès!');
        deliveryInfo = `Envoyé via ${smtpServer}`;
        success = true;
      }

    return { success, deliveryInfo };
  }
  getIcon(): string {
    return '📧';
  }
  getTitle(): string {
    return 'Email';
  }
}

class SmsSender implements NotificationSender {
  sendNotification(message: string): {success: boolean, deliveryInfo: string} {
    let success = false;
    let deliveryInfo = '';

    // Logique spécifique SMS
    console.log('📱 Envoi d\'un SMS...');
    const smsConfig = {
      to: '+33612345678',
      message: message,
      sender: 'MyApp',
      encoding: 'GSM-7'
    };
    console.log('Configuration SMS:', smsConfig);
    
    // Vérification longueur SMS
    const messageLength = message.length;
    const smsCount = Math.ceil(messageLength / 160);
    
    console.log(`Message: ${messageLength} caractères, ${smsCount} SMS`);
    
    // Simulation envoi via API Twilio/etc
    const apiKey = 'fake_api_key_12345';
    const apiResponse = { status: 'sent', id: 'SM' + Date.now() };
    
    console.log('Réponse API SMS:', apiResponse);
    deliveryInfo = `${smsCount} SMS envoyé(s)`;
    success = true;

    return { success, deliveryInfo };
  }
  getIcon(): string {
    return '📱';
  }
  getTitle(): string {
    return 'SMS';
  }
}

class PushSender implements NotificationSender {
  sendNotification(message: string): {success: boolean, deliveryInfo: string} {
    let success = false;
    let deliveryInfo = '';
    // Logique spécifique Push Notification
      console.log('🔔 Envoi d\'une push notification...');
      const pushConfig = {
        title: 'Nouvelle notification',
        body: message,
        icon: '/assets/icon.png',
        badge: '/assets/badge.png',
        tag: 'notification-' + Date.now(),
        requireInteraction: false,
        actions: [
          { action: 'view', title: 'Voir' },
          { action: 'dismiss', title: 'Ignorer' }
        ]
      };
      console.log('Configuration Push:', pushConfig);
      
      // Simulation Service Worker
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('Service Worker disponible');
        // Registration et envoi
        const subscription = { endpoint: 'https://fcm.googleapis.com/...' };
        console.log('Subscription:', subscription);
        
        // Envoi via FCM/APNS
        const fcmResponse = { success: 1, failure: 0 };
        console.log('Réponse FCM:', fcmResponse);
        deliveryInfo = 'Push envoyée via FCM';
        success = true;
      } else {
        console.warn('Push notifications non supportées');
        deliveryInfo = 'Push non supportée';
      }

    return { success, deliveryInfo };
  }
  getIcon(): string {
    return '🔔';
  }
  getTitle(): string {
    return 'Push Notification';
  }
}

class SlackSender implements NotificationSender {
  sendNotification(message: string): {success: boolean, deliveryInfo: string} {
    let success = false;
    let deliveryInfo = '';
    // Logique spécifique Slack
    console.log('💬 Envoi vers Slack...');
    const slackConfig = {
      channel: '#general',
      username: 'NotificationBot',
      icon_emoji: ':bell:',
      text: message,
      attachments: [
        {
          color: '#36a64f',
          title: 'Notification Système',
          text: message,
          footer: 'MyApp',
          ts: Math.floor(Date.now() / 1000)
        }
      ]
    };
    console.log('Configuration Slack:', slackConfig);
    
    // Envoi via Webhook Slack
    const webhookUrl = 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXX';
    console.log(`POST vers ${webhookUrl}`);
    
    const slackResponse = { ok: true };
    console.log('Réponse Slack:', slackResponse);
    
    if (slackResponse.ok) {
      deliveryInfo = `Posté sur ${slackConfig.channel}`;
      success = true;
    }

    return { success, deliveryInfo };
  }
  getIcon(): string {
    return '💬';
  }
  getTitle(): string {
    return 'Message Slack';
  }
}

class WebhookSender implements NotificationSender {
  sendNotification(message: string): {success: boolean, deliveryInfo: string} {

    let success = false;
    let deliveryInfo = '';
    // Logique spécifique Webhook
    console.log('🔗 Appel webhook...');
    const webhookConfig = {
      url: 'https://api.example.com/webhook',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': 'sha256=...',
        'Authorization': 'Bearer token_12345'
      },
      payload: {
        event: 'notification.sent',
        message: message,
        timestamp: new Date().toISOString(),
        source: 'notification-center'
      },
      timeout: 5000,
      retries: 3
    };
    console.log('Configuration Webhook:', webhookConfig);
    
    // Simulation d'appel HTTP
    console.log(`${webhookConfig.method} ${webhookConfig.url}`);
    console.log('Headers:', webhookConfig.headers);
    console.log('Body:', JSON.stringify(webhookConfig.payload));
    
    const webhookResponse = {
      status: 200,
      data: { received: true, id: 'wh_' + Date.now() }
    };
    console.log('Réponse Webhook:', webhookResponse);
    
    if (webhookResponse.status === 200) {
      deliveryInfo = `Webhook appelé (${webhookResponse.status})`;
      success = true;
    }

    return { success, deliveryInfo };
  }
  getIcon(): string {
    return '🔗';
  }
  getTitle(): string {
    return 'Webhook HTTP';
  }
}

