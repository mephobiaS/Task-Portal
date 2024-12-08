import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../interfaces/task.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
})
export class TaskDetailsComponent implements OnInit {
  task!: Task;
  comments: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskService.getTaskById(taskId).subscribe((data) => {
        this.task = data;
        this.comments = this.task.comments || [];
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/dashboard']);
  }
  logout() {
    this.authService.logout();
  }
}
