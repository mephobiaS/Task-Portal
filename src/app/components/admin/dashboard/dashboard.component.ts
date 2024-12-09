import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../../interfaces/task.interface';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { FormsModule } from '@angular/forms';
import { TaskFilterPipe } from '../../../pipes/task-filter.pipe';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DeleteDialogComponent, FormsModule, TaskFilterPipe],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  isDeleteDialogOpen: boolean = false; // State to control the dialog visibility
  selectedTaskId: string | null = null; // Stores the ID of the task to be deleted
  filterStatus: string = 'All';

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

  goToManageUsers() {
    this.router.navigate(['/admin/manage-users']);
  }

  // deleteTask(event: Event, task: Task): void {
  //   // Stop the event propagation to prevent triggering the viewTaskDetails
  //   event.stopPropagation();

  //   this.taskService
  //     .deleteTask(task.id)
  //     .then((data) => {})
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }

  openDeleteDialog(taskId: string, event: Event) {
    event.stopPropagation(); // Prevent event from bubbling to the row
    this.selectedTaskId = taskId;
    this.isDeleteDialogOpen = true;
  }

  closeDeleteDialog() {
    this.isDeleteDialogOpen = false;
    this.selectedTaskId = null;
  }

  deleteTaskFromModal(taskId: string) {
    this.taskService.deleteTask(taskId).then(() => {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      this.closeDeleteDialog();
    });
  }

  logout() {
    this.authService.logout();
  }
}
