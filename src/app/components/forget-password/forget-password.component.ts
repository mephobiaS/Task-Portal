import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  Auth,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from '@angular/fire/auth';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
})
export class ForgetPasswordComponent {
  forgotPasswordForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) return;
    const email = this.forgotPasswordForm.value.email;
    if (email) {
      //to : Check if the email is registered
      fetchSignInMethodsForEmail(this.auth, email)
        .then((methods) => {
          if (methods.length === 0) {
            //if: No registered user found
            this.errorMessage =
              'This email is not registered. Please register first.';
            this.successMessage = null;
          } else {
            // else: Send password reset email
            sendPasswordResetEmail(this.auth, email)
              .then(() => {
                this.successMessage =
                  'Password reset email sent! Please check your email to reset your password and then login.';
                this.errorMessage = null;
              })
              .catch((error) => {
                console.error(error);
                this.errorMessage = 'Please enter a valid email address.';
                this.successMessage = null;
              });
          }
        })
        .catch((error) => {
          console.error(error);
          this.errorMessage = 'An error occurred. Please try again later.';
          this.successMessage = null;
        });
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
