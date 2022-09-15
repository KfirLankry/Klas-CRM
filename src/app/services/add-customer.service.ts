import { Injectable } from '@angular/core';
import {
  collectionData,
  deleteDoc,
  doc,
  docData,
  DocumentReference,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/Customer';

@Injectable({
  providedIn: 'root',
})
export class AddCustomerService {
  customerRef = collection(this.firestore, 'customers');

  constructor(private firestore: Firestore) {}

  // Add Customer
  addCustomer(customer: Customer): Promise<DocumentReference<Customer>> {
    return addDoc(this.customerRef, customer) as Promise<
      DocumentReference<Customer>
    >;
  }

  // Get Customer
  getCustomer(): Observable<Customer[]> {
    return collectionData(this.customerRef, { idField: 'id' }) as Observable<
      Customer[]
    >;
  }

  // Get Customer ID
  getCustomerId(id: string): Observable<Customer> {
    const customerRef = doc(this.firestore, `customers/${id}`);
    return docData(customerRef, { idField: 'id' }) as Observable<Customer>;
  }

  // Edit Customer
  editCustomer(customer: Customer): Promise<void> {
    const customerRef = doc(this.firestore, `customers/${customer.id}`);
    return setDoc(customerRef, customer) as Promise<void>;
  }

  // Delete Customer
  deleteCustomer(customer: Customer): Promise<void> {
    const customerRef = doc(this.firestore, `customers/${customer.id}`);
    return deleteDoc(customerRef) as Promise<void>;
  }
}
