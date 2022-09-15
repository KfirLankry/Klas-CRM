import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Car } from '../interfaces/Car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  
  customerRef = collection(this.firestore, 'cars');

  constructor(private firestore:Firestore) {}
  
  getAll(): Observable<Car[]> {
    return collectionData(this.customerRef, { idField: 'id' }) as Observable<Car[]>
  }

}
