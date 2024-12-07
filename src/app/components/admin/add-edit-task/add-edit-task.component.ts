import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-task.component.html',
})
export class AddEditTaskComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private authService: AuthService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      project: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      assignedTo: ['', Validators.required],
      deadline: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.taskForm.invalid) {
      alert('Invalid Form Inputs.');
      return;
    }
    this.taskService.addTask(this.taskForm.value).then((data) => {});
    this.router.navigate(['/admin/dashboard']);
  }
  logout() {
    this.authService.logout();
  }
}
