import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartSidebarComponent } from './components/cart-sidebar/cart-sidebar.component';
import { NotificationToastComponent } from './components/notification-toast/notification-toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CartSidebarComponent, NotificationToastComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'catalogo-productos';
}