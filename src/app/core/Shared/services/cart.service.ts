import { computed, Injectable, signal } from '@angular/core';
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
    return this.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0);
  });
 addToCart(product: Product) {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = items.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedItems = [...items, { product, quantity: 1 }];
      }

      // console.log('Current Cart:', updatedItems);
      // console.log('Total Items Count:', updatedItems.reduce((acc, curr) => acc + curr.quantity, 0));

      return updatedItems;
    });
  }
}
