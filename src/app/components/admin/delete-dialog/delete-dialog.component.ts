import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
  @Input() taskId!: string;
  @Output() confirm = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  confirmDelete() {
    this.confirm.emit(this.taskId);
  }

  cancelDelete() {
    this.cancel.emit();
  }
}
