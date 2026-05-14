import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notifications.asObservable();
  private nextId = 0;

  show(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    const id = this.nextId++;
    const notification: Notification = { id, message, type };
    
    this.notifications.next([...this.notifications.value, notification]);
    
    setTimeout(() => {
      this.remove(id);
    }, 3000);
  }

  private remove(id: number): void {
    const filtered = this.notifications.value.filter(n => n.id !== id);
    this.notifications.next(filtered);
  }
}