// import { Injectable } from '@angular/core';
// import {
//   Firestore,
//   doc,
//   setDoc,
//   updateDoc,
//   collection,
//   addDoc,
//   deleteDoc,
//   collectionData,
// } from '@angular/fire/firestore';
// import { User } from '../interfaces/user.interface';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private collectionName = 'users'; // Firestore collection name

//   constructor(private firestore: Firestore) {}

//   // Add a new user
//   addUser(user: User): Promise<void> {
//     const userRef = doc(this.firestore, `${this.collectionName}/${user.uid}`);
//     return setDoc(userRef, user);
//   }

//   // Update user's role
//   updateUserRole(userId: string, role: string): Promise<void> {
//     const userRef = doc(this.firestore, `${this.collectionName}/${userId}`);
//     return updateDoc(userRef, { role });
//   }

//   // Delete a user
//   deleteUser(userId: string): Promise<void> {
//     const userRef = doc(this.firestore, `${this.collectionName}/${userId}`);
//     return deleteDoc(userRef);
//   }

//   // Fetch all users in real-time
//   getAllUsers(): Observable<User[]> {
//     const usersCollection = collection(this.firestore, this.collectionName);
//     return collectionData(usersCollection, { idField: 'id' }) as Observable<
//       User[]
//     >;
//   }

//   // Add a new user with an automatically generated ID
//   // addUserWithGeneratedId(user: Omit<User, 'id'>): Promise<void> {
//   //   const usersCollection = collection(this.firestore, this.collectionName);
//   //   return addDoc(usersCollection, user).then(() => {});
//   // }
//   addUserWithGeneratedId(user: Omit<User, 'uid'>): Promise<void> {
//     const usersCollection = collection(this.firestore, this.collectionName);
//     return addDoc(usersCollection, user).then((docRef) => {
//       // Add UID to the document
//       return updateDoc(docRef, { uid: docRef.id });
//     });
//   }
// }
import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  collectionData,
} from '@angular/fire/firestore';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private collectionName = 'users'; // Firestore collection name

  constructor(private firestore: Firestore, private auth: Auth) {}

  // Add a new user with an automatically generated ID and default password
  async addUserWithGeneratedId(user: Omit<User, 'uid'>): Promise<void> {
    // Create the user in Firebase Authentication with default password
    const cred = await createUserWithEmailAndPassword(
      this.auth,
      user.email!,
      'password' // Default password
    );

    // Save user data in Firestore

    const userData = {
      uid: cred.user.uid,
      email: user.email,
      role: user.role,
    };
    await setDoc(
      doc(this.firestore, `${this.collectionName}/${cred.user.uid}`),
      userData
    );
  }

  // Update user's role
  updateUserRole(userId: string, role: string): Promise<void> {
    const userRef = doc(this.firestore, `${this.collectionName}/${userId}`);
    return updateDoc(userRef, { role });
  }

  // Delete a user
  deleteUser(userId: string): Promise<void> {
    const userRef = doc(this.firestore, `${this.collectionName}/${userId}`);
    return deleteDoc(userRef);
  }

  // Fetch all users in real-time
  getAllUsers(): Observable<User[]> {
    const usersCollection = collection(this.firestore, this.collectionName);
    return collectionData(usersCollection, { idField: 'id' }) as Observable<
      User[]
    >;
  }
}
