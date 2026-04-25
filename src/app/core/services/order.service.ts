import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { CreateOrderRequest } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly api = inject(ApiService);

  createOrder(order: CreateOrderRequest): Observable<{ success: boolean; orderId: string }> {
    // Backend tayyor bo‘lganda pastdagi qatordan foydalanamiz:
    // return this.api.post<{ success: boolean; orderId: string }>('/orders', order);

    return of({
      success: true,
      orderId: `EC-${Date.now()}`
    });
  }
}