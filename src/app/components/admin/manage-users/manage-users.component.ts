import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-users.component.html',
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  newUser: Partial<User> = { email: '', role: 'Member' };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  addUser(event: Event): void {
    event.preventDefault(); // Prevent form reload

    if (this.newUser.email && this.newUser.role) {
      const user: Omit<User, 'uid'> = {
        email: this.newUser.email!,
        role: this.newUser.role as 'Admin' | 'Member',
      };

      this.userService
        .addUserWithGeneratedId(user)
        .then(() => {
          this.newUser = { email: '', role: 'Member' }; // Reset form after success
        })
        .catch((error) => {
          console.error('Error adding user:', error);
          alert(
            'There was an error adding the user. Please check the console.'
          );
        });
    } else {
      alert('Please fill in both email and role fields.');
    }
  }

  // updateUserRole(userId: string, role: string): void {
  //   this.userService.updateUserRole(userId, role).catch((error) => {
  //     console.error('Error updating user role:', error);
  //   });
  // }

  updateUserRole(userId: string, role: string): void {
    if (!role) return; // Prevent empty roles from being saved
    this.userService.updateUserRole(userId, role).catch((error) => {
      console.error('Error updating user role:', error);
    });
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).catch((error) => {
      console.error('Error deleting user:', error);
    });
  }
  goToDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }

  logout() {
    this.authService.logout();
  }
}
