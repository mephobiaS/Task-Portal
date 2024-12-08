export interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  assignedTo: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  deadline: string;
  comments: string[];
}
