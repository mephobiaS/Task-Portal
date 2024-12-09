import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
})
export class ErrorPageComponent {
  constructor(private router: Router) {}

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
