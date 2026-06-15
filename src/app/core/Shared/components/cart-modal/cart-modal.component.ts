import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent {
  dialogRef = inject(MatDialogRef<CartModalComponent>);
  cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);

  closeModal() {
    this.dialogRef.close();
  }

  checkout() {
    this.cartService.clearCart();
    this.dialogRef.close();
    this.snackBar.open('Checkout successful!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
  onDecreaseQuantity(id: any) {
    this.cartService.decreaseQuantity(id);
  }

  onIncreaseQuantity(id: any) {
    this.cartService.increaseQuantity(id);
  }

  onRemoveItem(id: any) {
    this.cartService.removeItem(id);
    this.snackBar.open('Item removed from cart!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['warm-snackbar']
    });
  }
}