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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductDetailsModalComponent } from '../../../../core/Shared/components/product-details-modal/product-details-modal.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CurrencyPipe,
    MatIcon,
    LoaderComponent,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

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

  onAddToCart(product: Product, event: Event) {
    event.stopPropagation();
    this.cartService.addToCart(product);
    this.snackBar.open('Item added to cart!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  openProductDetails(product: Product) {
    this.dialog.open(ProductDetailsModalComponent, {
      data: { product },
      width: '850px',
      maxWidth: '95vw',
      panelClass: 'custom-dialog-container',
      autoFocus: false
    });
  }
}