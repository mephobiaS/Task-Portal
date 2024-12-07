import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('./components/forget-password/forget-password.component').then(
        (m) => m.ForgetPasswordComponent
      ),
  },
  {
    path: 'admin',

    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/admin/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canActivate: [AuthGuard],
        data: { role: 'admin' },
      },
      {
        path: 'manage-users',
        loadComponent: () =>
          import('./components/admin/manage-users/manage-users.component').then(
            (m) => m.ManageUsersComponent
          ),
        canActivate: [AuthGuard],
        data: { role: 'admin' },
      },
      {
        path: 'add-task',
        loadComponent: () =>
          import(
            './components/admin/add-edit-task/add-edit-task.component'
          ).then((m) => m.AddEditTaskComponent),
        canActivate: [AuthGuard],
        data: { role: 'admin' },
      },
      {
        path: 'task-details/:id',
        loadComponent: () =>
          import('./components/admin/task-details/task-details.component').then(
            (m) => m.TaskDetailsComponent
          ),
        canActivate: [AuthGuard],
        data: { role: 'admin' },
      },
    ],
  },
  {
    path: 'member',

    children: [
      {
        path: 'member-dashboard',
        loadComponent: () =>
          import(
            './components/member/mem-dashboard/mem-dashboard.component'
          ).then((m) => m.MemDashboardComponent),

        canActivate: [AuthGuard],
        data: { role: 'member' },
      },
      {
        path: 'view/:id',
        loadComponent: () =>
          import('./components/member/view-task/view-task.component').then(
            (m) => m.ViewTaskComponent
          ),
        canActivate: [AuthGuard],
        data: { role: 'member' },
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
];
