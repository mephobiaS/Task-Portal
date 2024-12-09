import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Pipe({
  name: 'taskFilter',
  standalone: true,
})
export class TaskFilterPipe implements PipeTransform {
  transform(tasks: Task[], filterStatus: string): Task[] {
    if (filterStatus === 'All') {
      return tasks;
    }
    return tasks.filter(
      (task) => task.status.toLowerCase() === filterStatus.toLowerCase()
    );
  }
}
