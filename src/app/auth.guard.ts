import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

import { AuthService } from './services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getRole()?.toLowerCase();
  const requiredRole = route.data?.['role']?.toLowerCase();

  console.log('Retrieved Role (normalized):', role);
  console.log('Required Role (normalized):', requiredRole);

  if (role) {
    // Allow access if no role is required or if roles match
    if (!requiredRole || role === requiredRole) {
      return true;
    }
  }

  console.log('Redirecting to login...');
  router.navigate(['/error'], { replaceUrl: true });
  return false;
};
