import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/Order';

@Injectable({
  providedIn: 'root',
})
export class ordersService {
  orderRef = collection(this.firestore, 'orders');

  constructor(private firestore: Firestore) {}

  getAll(): Observable<Order[]> {
    return collectionData(this.orderRef, { idField: 'id' }) as Observable<
      Order[]
    >;
  }

  // Add Order
  addOrder(order: Order): Promise<DocumentReference<Order>> {
    return addDoc(this.orderRef, order) as Promise<DocumentReference<Order>>;
  }

  // Edit Order
  editOrder(order: Order): Promise<void> {
    const orderRef = doc(this.firestore, `order/${order.id}`);
    return setDoc(orderRef, order) as Promise<void>;
  }

  // Delete Order
  deleteOrder(order: Order): Promise<void> {
    const orderRef = doc(this.firestore, `orders/${order.id}`);
    return deleteDoc(orderRef) as Promise<void>;
  }
}
