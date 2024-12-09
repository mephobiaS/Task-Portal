export interface User {
  uid: string;
  email: string;
  role: 'Admin' | 'Member';
}
