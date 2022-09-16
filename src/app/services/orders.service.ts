import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/Order';

@Injectable({
  providedIn: 'root'
})
export class ordersService {
  
  customerRef = collection(this.firestore, 'orders');

  constructor(private firestore:Firestore) {}
  
  getAll(): Observable<Order[]> {
    return collectionData(this.customerRef, { idField: 'id' }) as Observable<Order[]>
  }

}
