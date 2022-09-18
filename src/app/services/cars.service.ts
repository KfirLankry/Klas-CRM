import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Car } from '../interfaces/Car';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  carRef = collection(this.firestore, 'cars');

  constructor(private firestore: Firestore) {}

  getAll(): Observable<Car[]> {
    return collectionData(this.carRef, { idField: 'id' }) as Observable<Car[]>;
  }

  // Get Car ID
  getCarById(id: string): Observable<Car> {
    const carRef = doc(this.firestore, `cars/${id}`);
    return docData(carRef, { idField: 'id' }) as Observable<Car>;
  }
}
