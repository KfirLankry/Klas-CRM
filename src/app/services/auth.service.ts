import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  DocumentReference,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { Observable } from 'rxjs';
import { Reminder } from '../interfaces/Reminder';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  reminderRef = collection(this.firestore, 'reminder');
  constructor(private auth: Auth, private firestore: Firestore) {}

  // Get Reminder
  getReminder(): Observable<Reminder[]> {
    return collectionData(this.reminderRef, { idField: 'id' }) as Observable<
      Reminder[]
    >;
  }

  // Get Reminder ID
  getReminderId(id: string): Observable<Reminder> {
    const reminderRef = doc(this.firestore, `reminder/${id}`);
    return docData(reminderRef, { idField: 'id' }) as Observable<Reminder>;
  }

  // Edit Reminder
  editReminder(reminder: Reminder): Promise<void> {
    const reminderRef = doc(this.firestore, `reminder/${reminder.id}`);
    return setDoc(reminderRef, reminder) as Promise<void>;
  }

  // Register
  register(user: User): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  // Login
  login(user: User): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  loginWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  // Logout
  logout(): Promise<void> {
    return this.auth.signOut();
  }

  // Get Session Storage Session
  getSessionData(key: string): string {
    return localStorage.getItem(key) as string;
  }

  // Set Session Storage Session
  setSessionData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
