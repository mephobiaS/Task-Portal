import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: any;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  // Register a new user
  async registerUser(email: string, password: string, role: string = 'member') {
    // Assign the 'admin' role based on the email or other condition
    if (email === 'alice.admin@example.com') {
      role = 'admin';
    }

    const cred = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const userData = {
      uid: cred.user.uid,
      email: email,
      role: role,
    };
    // Save user data in Firestore
    const userDocRef = doc(this.firestore, `users/${cred.user.uid}`);
    await setDoc(userDocRef, userData);
  }

  // Login an existing user
  async login(email: string, password: string) {
    try {
      console.log('Attempting to log in with email:', email);
      const cred = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Authentication successful, user:', cred.user);
      const userDoc = doc(this.firestore, `users/${cred.user.uid}`);
      console.log('Fetching user document from Firestore:', userDoc);
      const userSnapshot = await getDoc(userDoc);
      console.log('Firestore user document fetched:', userSnapshot.data());

      if (userSnapshot.exists()) {
        this.currentUser = { uid: cred.user.uid, ...userSnapshot.data() };
        console.log('Setting sessionStorage with user:', this.currentUser);
        sessionStorage.setItem('user', JSON.stringify(this.currentUser));
        console.log(
          'User stored in sessionStorage:',
          sessionStorage.getItem('user')
        ); // Debug log
      } else {
        throw new Error('User data not found in Firestore');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  getRole() {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
    return this.currentUser.role;
  }
  // Get currently logged-in user
  getLoggedInUser() {
    const user = sessionStorage.getItem('user');
    console.log('getting logged in user:', sessionStorage.getItem('user')); // Debug log
    if (user) {
      this.currentUser = JSON.parse(user);
    }
    return this.currentUser;
  }

  // Logout the user
  async logout() {
    await signOut(this.auth);
    this.currentUser = null;
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
