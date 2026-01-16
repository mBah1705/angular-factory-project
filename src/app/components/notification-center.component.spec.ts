// notification-center.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationCenterComponent, NotificationFactory } from './notification-center.component';

describe('NotificationCenterComponent', () => {
  let component: NotificationCenterComponent;
  let fixture: ComponentFixture<NotificationCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationCenterComponent],
      providers: [NotificationFactory]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.message = 'Test message';
    component.selectedType = 'email';
    component.sendNotification();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send notification', () => {
    expect(component.notifications.length).toBe(1);
    expect(component.notifications[0].type).toBe('email');
  });

  it('should get correct icon', () => {
    expect(component.notifications[0].icon).toBe('📧')
  });
});
