import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-task.component.html',
})
export class ViewTaskComponent implements OnInit {
  task: any = {};
  comments: string[] = [];
  updatedStatus!: string;
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    console.log('task id:', taskId);
    if (taskId) {
      this.taskService.getTaskById(taskId).subscribe((task) => {
        this.task = task;
        this.updatedStatus = task.status;
        this.comments = task.comments || [];
      });
    }
  }

  updateStatus(): void {
    if (this.task) {
      this.taskService
        .editTask(this.task.id, { status: this.updatedStatus })
        .then(() => {
          alert('Status updated successfully!');
        });
    }
  }

  addComment(): void {
    if (this.newComment.trim()) {
      this.comments.push(this.newComment.trim());
      this.taskService
        .editTask(this.task.id, { comments: this.comments })
        .then(() => {
          this.newComment = '';
          alert('Comment added successfully!');
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/member/member-dashboard']);
  }
}
