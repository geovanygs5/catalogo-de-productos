import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    if (this.isBrowser) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartItems.next(JSON.parse(savedCart));
      }
    }
  }

  private saveToLocalStorage(): void {
    if (this.isBrowser) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
    }
  }

  addToCart(product: Product): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.next([...currentItems]);
    } else {
      const cartItem: CartItem = { ...product, quantity: 1 };
      this.cartItems.next([...currentItems, cartItem]);
    }
    this.saveToLocalStorage();
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.value;
    const filtered = currentItems.filter(item => item.id !== productId);
    this.cartItems.next(filtered);
    this.saveToLocalStorage();
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(i => i.id === productId);
    if (item && quantity > 0) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
      this.saveToLocalStorage();
    }
  }

  getTotalItems(): number {
    return this.cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.saveToLocalStorage();
  }
}