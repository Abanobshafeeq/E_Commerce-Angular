import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../../Features/Products/models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  totalItems = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.quantity, 0);
  });

  totalPrice = computed(() => {
    return this.cartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  addToCart(product: Product, quantity: number = 1) {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      
      return [...items, { product, quantity }];
    });
  }

  increaseQuantity(product: Product) {
    this.cartItems.update(items =>
      items.map(item =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  decreaseQuantity(product: Product) {
    this.cartItems.update(items =>
      items.map(item =>
        item.product.id === product.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  removeItem(product: Product) {
    this.cartItems.update(items => items.filter(item => item.product.id !== product.id));
  }

  clearCart() {
    this.cartItems.set([]);
  }
}