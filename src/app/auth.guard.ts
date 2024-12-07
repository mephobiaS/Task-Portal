import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

import { AuthService } from './services/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard {
//   constructor(private authService: AuthService, private router: Router) {}

// canActivate(route: ActivatedRouteSnapshot): boolean {
//   const user = this.authService.getLoggedInUser();
//   console.log('User in AuthGuard:', user);
//   if (!user || !user.role) {
//     // Redirect to login if not authenticated
//     this.router.navigate(['/login']);
//     return false;
//   }

//   const expectedRole = route.data?.['role']; // Role required for the route
//   console.log('Expected role:', expectedRole); // Debug log for required role
//   console.log(
//     'Session storage before checking authguard:',
//     sessionStorage.getItem('user')
//   );
//   if (user.role !== expectedRole) {
//     // Redirect to login
//     this.router.navigate(['/login']);
//     return false;
//   }

//   return true;
// }
// }

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getRole();
  console.log('Role:', role);

  if (role) {
    const requiredRole = route.data['role'];
    if (!requiredRole || role === requiredRole) {
      return true;
    }
  }

  router.navigate(['login'], { replaceUrl: true });
  return false;
};
