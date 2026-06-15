import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../Shared/services/cart.service';
import { CartModalComponent } from '../../Shared/components/cart-modal/cart-modal.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatBadgeModule,
    RouterLink,
    RouterLinkActive,
    MatDialogModule
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  cartService = inject(CartService);
  dialog = inject(MatDialog);

  openCart() {
    this.dialog.open(CartModalComponent, {
      width: '550px',
      maxWidth: '95vw',
      panelClass: 'custom-dialog-container',
      autoFocus: false
    });
  }
}