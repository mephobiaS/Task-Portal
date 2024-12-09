import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup; // FormGroup for login and registration
  mode: boolean = false; // false = Login mode, true = Register mode
  errorMessage: string = ''; // Error message for form submission

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form with default fields
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: [''], // Optional, used only in Register mode
    });
  }

  async onSubmit() {
    this.errorMessage = ''; // Clear any error messages

    if (!this.loginForm.valid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const { email, password, username } = this.loginForm.value;
    console.log('Form submitted with:', email, password, username);

    try {
      if (this.mode) {
        // Register mode
        console.log('Registering user:', email, username);
        await this.authService.registerUser(email, password);

        // Optional: Login the user immediately after registration
        console.log('Automatically logging in user after registration.');
        await this.authService.login(email, password);

        // Navigate to the dashboard based on role
        const user = this.authService.getLoggedInUser();
        const role = user.role?.toLowerCase();
        if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'member') {
          this.router.navigate(['/member/member-dashboard']);
        }
      } else {
        // Login mode
        console.log('Logging in user:', email);
        await this.authService.login(email, password);

        const user = this.authService.getLoggedInUser();
        const role = user.role?.toLowerCase();
        if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'member') {
          this.router.navigate(['/member/member-dashboard']);
        }
      }
    } catch (error: any) {
      console.error('Error during form submission:', error);
      this.errorMessage = error.message || 'An error occurred.';
    }
  }

  // Toggle between Login and Register mode
  toggleMode() {
    this.mode = !this.mode;
    this.errorMessage = '';
    if (this.mode) {
      // If switching to Register mode, include the username field
      this.loginForm.addControl(
        'username',
        this.fb.control('', [Validators.required])
      );
    } else {
      // If switching to Login mode, remove the username field
      this.loginForm.removeControl('username');
    }
  }

  // Navigate to forgot password page
  navigateToForgotPassword() {
    this.router.navigate(['/forget-password']);
  }
}
