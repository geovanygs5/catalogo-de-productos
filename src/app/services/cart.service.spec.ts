import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../models/product.model';

describe('CartService', () => {
  let service: CartService;

  const mockProduct: Product = {
    id: 1,
    title: 'Producto Test',
    price: 100,
    stock: 10,
    rating: 4.5,
    brand: 'Test Brand',
    category: 'Test Category',
    thumbnail: 'test.jpg',
    description: 'Test description',
    images: ['test1.jpg']
  };

  const mockProduct2: Product = {
    ...mockProduct,
    id: 2,
    title: 'Producto Test 2',
    price: 50
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    localStorage.clear();
    service.clearCart();
  });

  it('deberia be creard', () => {
    expect(service).toBeTruthy();
  });

  it('deberia add product to cart', () => {
    service.addToCart(mockProduct);
    expect(service.getTotalItems()).toBe(1);
  });

  it('deberia increase quantity when adding same product twice', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct);
    expect(service.getTotalItems()).toBe(2);
  });

  it('deberia add different products as separate items', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct2);
    expect(service.getTotalItems()).toBe(2);
  });

  it('deberia remover product de cart', () => {
    service.addToCart(mockProduct);
    service.removeFromCart(1);
    expect(service.getTotalItems()).toBe(0);
  });

  it('deberia actualizar cantidad', () => {
    service.addToCart(mockProduct);
    service.updateQuantity(1, 5);
    
    service.cartItems$.subscribe(items => {
      expect(items[0].quantity).toBe(5);
    });
  });

  it('deberia calculate total price correctly', () => {
    service.addToCart(mockProduct); // $100
    service.addToCart(mockProduct); // $100
    service.addToCart(mockProduct2); // $50
    expect(service.getTotalPrice()).toBe(250);
  });

  it('deberia clear cart', () => {
    service.addToCart(mockProduct);
    service.clearCart();
    expect(service.getTotalItems()).toBe(0);
  });

  it('deberia persist cart to localStorage', () => {
    service.addToCart(mockProduct);
    const saved = localStorage.getItem('cart');
    expect(saved).toBeTruthy();
    const parsed = JSON.parse(saved!);
    expect(parsed.length).toBe(1);
  });
});