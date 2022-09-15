import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/Contact';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {

  customerRef = collection(this.firestore, 'contacts');

  constructor(private firestore:Firestore) {}
  getAll(): Observable<Contact[]> {
    return collectionData(this.customerRef, { idField: 'id' }) as Observable<Contact[]>
  }

}
