import { HttpClient } from '@angular/common/http';
import { inject, Injectable ,PLATFORM_ID } from '@angular/core';
import { Product } from '../models/product.model';
import { catchError, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = 'https://fakestoreapi.com/products';

  // fetch products from the API
  private products$ = isPlatformBrowser(this.platformId)
    ? this.http.get<Product[]>(this.apiUrl).pipe(
        catchError(() => of([]))
      )
    : of([]);

  public products = toSignal(this.products$ ,{ initialValue: [] as Product[] });

}
