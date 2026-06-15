import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../../../../Features/Products/models/product.model';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-product-details-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule
],
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.css']
})
export class ProductDetailsModalComponent {
  dialogRef = inject(MatDialogRef<ProductDetailsModalComponent>);
  data = inject<{ product: Product }>(MAT_DIALOG_DATA);
  cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);

  product = this.data.product;
  quantity = signal(1);

  closeModal() {
    this.dialogRef.close();
  }

  increaseQuantity() {
    this.quantity.update(q => q + 1);
  }

  decreaseQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product, this.quantity());
    
    this.snackBar.open('Added to cart successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar']
    });

    this.closeModal();
  }
}