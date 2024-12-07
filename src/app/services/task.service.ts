import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  updateDoc,
  doc,
  docData,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { Task } from '../interfaces/task.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private collectionName = 'tasks';
  constructor(private firestore: Firestore) {}

  //add a new task
  async addTask(data: Task): Promise<void> {
    const itemCollection = collection(this.firestore, this.collectionName);
    const taskWithTimestamp = {
      ...data,
      createdAt: new Date().toISOString(), // Add a timestamp
    };
    await addDoc(itemCollection, taskWithTimestamp);
  }

  //get Tasks
  getTasks(): Observable<any[]> {
    const itemCollection = collection(this.firestore, this.collectionName);
    const q = query(itemCollection, orderBy('createdAt', 'asc')); // Order by createdAt
    return collectionData(q, { idField: 'id' });
  }

  //view an task by id
  getTaskById(id: string): Observable<any> {
    const itemDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(itemDoc, { idField: 'id' });
  }

  //edit a task
  async editTask(id: string, data: any): Promise<void> {
    const itemDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    await updateDoc(itemDoc, data);
  }

  //delete a task
  async deleteTask(id: string): Promise<void> {
    const itemDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    await deleteDoc(itemDoc);
  }
}
