import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartSidebarComponent } from './cart-sidebar.component';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { Product } from '../../models/product.model';

describe('CartSidebarComponent', () => {
  let component: CartSidebarComponent;
  let fixture: ComponentFixture<CartSidebarComponent>;
  let cartService: CartService;
  let notificationService: NotificationService;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    stock: 10,
    rating: 4.5,
    brand: 'Test',
    category: 'Test',
    thumbnail: 'test.jpg',
    description: 'Test',
    images: ['test.jpg']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSidebarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CartSidebarComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    notificationService = TestBed.inject(NotificationService);
    
    cartService.clearCart();
    fixture.detectChanges();
  });

  it('deberia crear', () => {
    expect(component).toBeTruthy();
  });

  it('deberia abrir cart', () => {
    component.openCart();
    expect(component.isOpen).toBe(true);
  });

  it('deberia cerrar cart', () => {
    component.isOpen = true;
    component.closeCart();
    expect(component.isOpen).toBe(false);
  });

  it('deberia remover item de cart', () => {
    cartService.addToCart(mockProduct);
    component.removeItem(1);
    expect(cartService.getTotalItems()).toBe(0);
  });

  it('deberia actualizar cantidad', () => {
    cartService.addToCart(mockProduct);
    component.updateQuantity(1, 5);
    
    cartService.cartItems$.subscribe(items => {
      expect(items[0].quantity).toBe(5);
    });
  });

  it('deberia calculate total price', () => {
    cartService.addToCart(mockProduct);
    cartService.addToCart(mockProduct);
    expect(component.getTotalPrice()).toBe(200);
  });

  it('deberia calculate total items', () => {
    cartService.addToCart(mockProduct);
    cartService.addToCart(mockProduct);
    expect(component.getTotalItems()).toBe(2);
  });

  it('deberia clear cart', () => {
    cartService.addToCart(mockProduct);
    component.clearCart();
    expect(cartService.getTotalItems()).toBe(0);
  });

  it('deberia checkout and clear cart', () => {
    cartService.addToCart(mockProduct);
    const notificationSpy = jest.spyOn(notificationService, 'show');
    
    component.checkout();
    
    expect(cartService.getTotalItems()).toBe(0);
    expect(notificationSpy).toHaveBeenCalled();
  });
});