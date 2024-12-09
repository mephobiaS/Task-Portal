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
  //fetchSignInMethodsForEmail not working
  // onSubmit(): void {
  //   if (this.forgotPasswordForm.invalid) {
  //     this.errorMessage = 'Please provide a valid email.';
  //     return;
  //   }

  //   const email = this.forgotPasswordForm.value.email;

  //   if (email) {
  //     fetchSignInMethodsForEmail(this.auth, email)
  //       .then((methods) => {
  //         console.log('Methods fetched for email:', email, methods);
  //         if (methods && methods.length > 0) {
  //           // Email is registered
  //           sendPasswordResetEmail(this.auth, email)
  //             .then(() => {
  //               this.successMessage =
  //                 'Password reset email sent! Please check your email.';
  //               this.errorMessage = null;
  //             })
  //             .catch((error) => {
  //               console.error('Error sending password reset email:', error);
  //               // this.errorMessage = this.getErrorMessage(error.code);
  //               this.successMessage = null;
  //             });
  //         } else {
  //           // Email not registered
  //           this.errorMessage =
  //             'This email is not registered. Please register first.';
  //           this.successMessage = null;
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(
  //           'Error fetching sign-in methods for email:',
  //           email,
  //           error
  //         );
  //         this.errorMessage =
  //           'An error occurred while verifying your email. Please try again later.';
  //         this.successMessage = null;
  //       });
  //   }
  // }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) return;

    const email = this.forgotPasswordForm.value.email.toLowerCase(); // lowercase email for consistency
    console.log('Attempting password reset for email:', email);

    // Direct attempt to send the reset email
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        console.log('Password reset email sent successfully.');
        this.successMessage =
          'Password reset email sent! Please check your inbox to reset your password.';
        this.errorMessage = null;
      })
      .catch((error) => {
        console.error('Error sending reset email:', error);
        this.errorMessage =
          'Failed to send password reset email. Please try again.';
        this.successMessage = null;
      });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
