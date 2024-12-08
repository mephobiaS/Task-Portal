import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';
import { Task } from '../../../interfaces/task.interface';
import { CommonModule } from '@angular/common';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-mem-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mem-dashboard.component.html',
})
export class MemDashboardComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}
  userrr: string = '';
  ngOnInit(): void {
    const loggedInUser = this.authService.getLoggedInUser();
    const userName = loggedInUser.email.split('.')[0];
    this.userrr = userName;
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.filter((task) => task.assignedTo === userName);
    });
  }

  viewTask(taskId: string): void {
    this.router.navigate([`/member/view-task/${taskId}`]);
  }

  logout(): void {
    this.authService.logout();
  }
}
