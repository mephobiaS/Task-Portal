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

  // Handle form submission
  async onSubmit() {
    this.errorMessage = ''; // Clear error messages

    if (!this.loginForm.valid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const { email, password } = this.loginForm.value;
    console.log('Attempting login with:', email, password); // Debug log

    try {
      await this.authService.login(email, password);

      const user = this.authService.getLoggedInUser();
      console.log('getloggedin user:', user); // Debug log
      if (user.role === 'admin') {
        console.log('Navigating to Admin Dashboard'); // Debug log
        this.router.navigate(['/admin/dashboard']);
      } else if (user.role === 'member') {
        console.log('Navigating to member Dashboard'); // Debug log
        this.router.navigate(['/member/member-dashboard']);
      } else {
        console.log('Navigating to login'); // Debug log
        this.router.navigate(['/login']);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      this.errorMessage = error.message || 'An error occurred.';
    }
  }

  // Toggle between Login and Register mode
  toggleMode() {
    this.mode = !this.mode;
    this.errorMessage = ''; // Clear any previous error messages
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
