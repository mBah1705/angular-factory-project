import { Routes } from '@angular/router';
import { ReportGeneratorComponent } from './components/report-generator.component';
import { NotificationCenterComponent } from './components/notification-center.component';
import { DynamicFormComponent } from './components/dynamic-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/reports', pathMatch: 'full' },
  { path: 'reports', component: ReportGeneratorComponent },
  { path: 'notifications', component: NotificationCenterComponent },
  { path: 'forms', component: DynamicFormComponent }
];
