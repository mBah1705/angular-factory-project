// notification-center.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationCenterComponent } from './notification-center.component';

describe('NotificationCenterComponent', () => {
  let component: NotificationCenterComponent;
  let fixture: ComponentFixture<NotificationCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationCenterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send notification', () => {
    component.message = 'Test message';
    component.selectedType = 'email';
    component.sendNotification();
    
    expect(component.notifications.length).toBe(1);
    expect(component.notifications[0].type).toBe('email');
  });

  it('should get correct icon', () => {
    expect(component.notifications[0].icon).toBe('📧')
  });
});
