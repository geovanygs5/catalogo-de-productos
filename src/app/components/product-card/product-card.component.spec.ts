import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { ProductCarouselComponent } from '../product-carousel/product-carousel.component';
import { Product } from '../../models/product.model';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    rating: 4.5,
    stock: 10,
    brand: 'Test Brand',
    category: 'Electronics',
    thumbnail: 'test.jpg',
    description: 'Test description',
    images: ['image1.jpg', 'image2.jpg']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductCardComponent,
        ProductCarouselComponent,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('deberia crear', () => {
    expect(component).toBeTruthy();
  });

  it('deberia display product title', () => {
    const titleElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(titleElement.textContent).toContain('Test Product');
  });

  it('deberia display product price', () => {
    const priceElement = fixture.debugElement.query(By.css('.price')).nativeElement;
    expect(priceElement.textContent).toContain('99.99');
  });

  it('deberia display product category', () => {
    const categoryElement = fixture.debugElement.query(By.css('.category')).nativeElement;
    expect(categoryElement.textContent).toContain('Electronics');
  });

  it('deberia emit addToCart event when button clicked', () => {
    jest.spyOn(component.addToCart, 'emit');
    const button = fixture.debugElement.query(By.css('.add-btn')).nativeElement;
    button.click();
    expect(component.addToCart.emit).toHaveBeenCalledWith(mockProduct);
  });

  it('deberia disable add button when stock is 0', () => {
    component.product.stock = 0;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.add-btn')).nativeElement;
    expect(button.disabled).toBe(true);
  });

  it('deberia generate correct stars array', () => {
    const stars = component.getStarsArray(4.5);
    expect(stars.length).toBe(4);
  });

  it('deberia return correct stock class for high stock', () => {
    component.product.stock = 20;
    expect(component.getStockClass()).toBe('in-stock');
  });

  it('deberia return correct stock class for low stock', () => {
    component.product.stock = 5;
    expect(component.getStockClass()).toBe('low-stock');
  });

  it('deberia return correct stock class for out of stock', () => {
    component.product.stock = 0;
    expect(component.getStockClass()).toBe('out-of-stock');
  });

  it('deberia return correct stock text for high stock', () => {
    component.product.stock = 20;
    expect(component.getStockText()).toBe('Disponible');
  });

  it('deberia return correct stock text for low stock', () => {
    component.product.stock = 5;
    expect(component.getStockText()).toBe('Stock: 5');
  });

  it('deberia return correct stock text for out of stock', () => {
    component.product.stock = 0;
    expect(component.getStockText()).toBe('Agotado');
  });

  it('deberia pass images and thumbnail to carousel component', () => {
    const carouselComponent = fixture.debugElement.query(By.directive(ProductCarouselComponent)).componentInstance;
    expect(carouselComponent.images).toEqual(mockProduct.images);
    expect(carouselComponent.thumbnail).toBe(mockProduct.thumbnail);
  });
});