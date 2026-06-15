import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge'; // Great for a cart item count
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../Shared/services/cart.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatBadgeModule ,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  // You can connect this to your Cart signal later
  cartService = inject(CartService);
}