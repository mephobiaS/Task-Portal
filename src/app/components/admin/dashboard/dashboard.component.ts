import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../../interfaces/task.interface';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private authService: AuthService
  ) {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }
  ngOnInit(): void {}

  viewTaskDetails(task: Task) {
    this.router.navigate([`/admin/task-details/${task.id}`]);
  }

  goToAddTask() {
    this.router.navigate(['/admin/add-task']);
  }

  deleteTask(event: Event, task: Task): void {
    // Stop the event propagation to prevent triggering the viewTaskDetails
    event.stopPropagation();

    this.taskService
      .deleteTask(task.id)
      .then((data) => {})
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  logout() {
    this.authService.logout();
  }
}
