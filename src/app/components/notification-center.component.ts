import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Notification {
  id: number;
  type: string;
  message: string;
  timestamp: Date;
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
          <div class="notif-icon">{{ getIcon(notif.type) }}</div>
          <div class="notif-content">
            <strong>{{ getTitle(notif.type) }}</strong>
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
export class NotificationCenterComponent {
  selectedType: string = 'email';
  message: string = '';
  notifications: Notification[] = [];
  private idCounter = 1;

  sendNotification() {
    if (!this.message.trim()) {
      alert('Veuillez entrer un message');
      return;
    }

    // PROBLÈME: Beaucoup de if/else pour gérer les différents types
    // Chaque type a sa propre logique d'envoi
    
    let success = false;
    let deliveryInfo = '';

    if (this.selectedType === 'email') {
      // Logique spécifique Email
      console.log('📧 Envoi d\'un email...');
      const emailConfig = {
        from: 'noreply@example.com',
        to: 'user@example.com',
        subject: 'Notification',
        body: this.message,
        html: `<p>${this.message}</p>`,
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
      
    } else if (this.selectedType === 'sms') {
      // Logique spécifique SMS
      console.log('📱 Envoi d\'un SMS...');
      const smsConfig = {
        to: '+33612345678',
        message: this.message,
        sender: 'MyApp',
        encoding: 'GSM-7'
      };
      console.log('Configuration SMS:', smsConfig);
      
      // Vérification longueur SMS
      const messageLength = this.message.length;
      const smsCount = Math.ceil(messageLength / 160);
      
      console.log(`Message: ${messageLength} caractères, ${smsCount} SMS`);
      
      // Simulation envoi via API Twilio/etc
      const apiKey = 'fake_api_key_12345';
      const apiResponse = { status: 'sent', id: 'SM' + Date.now() };
      
      console.log('Réponse API SMS:', apiResponse);
      deliveryInfo = `${smsCount} SMS envoyé(s)`;
      success = true;
      
    } else if (this.selectedType === 'push') {
      // Logique spécifique Push Notification
      console.log('🔔 Envoi d\'une push notification...');
      const pushConfig = {
        title: 'Nouvelle notification',
        body: this.message,
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
      
    } else if (this.selectedType === 'slack') {
      // Logique spécifique Slack
      console.log('💬 Envoi vers Slack...');
      const slackConfig = {
        channel: '#general',
        username: 'NotificationBot',
        icon_emoji: ':bell:',
        text: this.message,
        attachments: [
          {
            color: '#36a64f',
            title: 'Notification Système',
            text: this.message,
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
      
    } else if (this.selectedType === 'webhook') {
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
          message: this.message,
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
    }

    if (success) {
      this.notifications.unshift({
        id: this.idCounter++,
        type: this.selectedType,
        message: `${this.message} - ${deliveryInfo}`,
        timestamp: new Date()
      });
      this.message = '';
    }
  }

  getIcon(type: string): string {
    // PROBLÈME: Plus de if/else pour obtenir l'icône
    if (type === 'email') return '📧';
    if (type === 'sms') return '📱';
    if (type === 'push') return '🔔';
    if (type === 'slack') return '💬';
    if (type === 'webhook') return '🔗';
    return '❓';
  }

  getTitle(type: string): string {
    // PROBLÈME: Encore des if/else
    if (type === 'email') return 'Email';
    if (type === 'sms') return 'SMS';
    if (type === 'push') return 'Push Notification';
    if (type === 'slack') return 'Message Slack';
    if (type === 'webhook') return 'Webhook HTTP';
    return 'Inconnu';
  }
}
