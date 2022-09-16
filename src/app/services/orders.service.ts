import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/Order';

@Injectable({
  providedIn: 'root'
})
export class ordersService {
  
  orderRef = collection(this.firestore, 'orders');

  constructor(private firestore:Firestore) {}
  
  getAll(): Observable<Order[]> {
    return collectionData(this.orderRef, { idField: 'id' }) as Observable<Order[]>
  }

  addOrder(order: Order): Promise<DocumentReference<Order>> {
    return addDoc(this.orderRef, order) as Promise<
      DocumentReference<Order>
    >;
  }

}
