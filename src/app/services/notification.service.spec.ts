import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('deberia be creard', () => {
    expect(service).toBeTruthy();
  });

  it('deberia add a notification', (done) => {
    service.show('Test message', 'success');
    
    service.notifications$.subscribe(notifications => {
      expect(notifications.length).toBe(1);
      expect(notifications[0].message).toBe('Test message');
      expect(notifications[0].type).toBe('success');
      done();
    });
  });

  it('deberia auto-remover notification after 3 seconds', (done) => {
    service.show('Auto remove test', 'info');
    
    setTimeout(() => {
      service.notifications$.subscribe(notifications => {
        expect(notifications.length).toBe(0);
        done();
      });
    }, 3100);
  });

  it('deberia handle multiple notifications', (done) => {
    service.show('First', 'success');
    service.show('Second', 'error');
    
    service.notifications$.subscribe(notifications => {
      expect(notifications.length).toBe(2);
      expect(notifications[0].message).toBe('First');
      expect(notifications[1].message).toBe('Second');
      done();
    });
  });

  it('deberia show different types of notifications', (done) => {
    service.show('Success!', 'success');
    service.show('Error!', 'error');
    service.show('Info!', 'info');
    
    service.notifications$.subscribe(notifications => {
      expect(notifications[0].type).toBe('success');
      expect(notifications[1].type).toBe('error');
      expect(notifications[2].type).toBe('info');
      done();
    });
  });
});