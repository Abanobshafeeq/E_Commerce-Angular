import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { LoaderComponent } from "../../../../core/Shared/components/loader/loader.component";
import { CartService } from '../../../../core/Shared/services/cart.service';
import { Product } from '../../models/product.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CurrencyPipe,
    MatIcon,
    LoaderComponent,
    MatSnackBarModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);
  products = this.productService.products;
  categories: string[] = [];

  selectedCategory = signal<string>('All Categories');

  filteredProducts = computed(() => {
    const currentCategory = this.selectedCategory();
    const allProducts = this.products();

    if (currentCategory === 'All Categories') {
      return allProducts;
    }

    return allProducts.filter(product => product.category === currentCategory);
  });
  
  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.productService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  onCategorySelect(category: string, event: Event) {
    event.preventDefault();
    this.selectedCategory.set(category);
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
    this.snackBar.open('Item added to cart!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
}