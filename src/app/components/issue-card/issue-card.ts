import { Component, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Issue, Status, Priority } from '../../models/issue';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-issue-card',
  styleUrl: './issue-card.css',
  templateUrl: './issue-card.html',
})
export class IssueCard {
  issue = input.required<Issue>();
  deletedIssue = output<number>();
  updatedIssue = output<Issue>();

  isEditing = signal(false);

  editForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
  });

  getStatusClass(status: Status): string {
    const classes = {
      open: 'bg-blue-50 text-blue-700',
      in_progress: 'bg-amber-50 text-amber-700',
      closed: 'bg-emerald-50 text-emerald-700',
    };
    return classes[status];
  }

  getStatusDotClass(status: Status): string {
    const classes = {
      open: 'bg-blue-500',
      in_progress: 'bg-amber-500',
      closed: 'bg-emerald-500',
    };
    return classes[status];
  }

  getStatusLabel(status: Status): string {
    const labels = {
      open: 'Open',
      in_progress: 'In Progress',
      closed: 'Closed',
    };
    return labels[status];
  }

  getPriorityClass(priority: Priority): string {
    const classes = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-orange-100 text-orange-700',
      high: 'bg-red-100 text-red-700',
    };
    return classes[priority];
  }

  getPriorityLabel(priority: Priority): string {
    const labels = {
      low: 'Low Priority',
      medium: 'Medium Priority',
      high: 'High Priority',
    };
    return labels[priority];
  }

  handleDelete(): void {
    if (confirm(`Are you sure you want to delete "${this.issue().title}"?`)) {
      this.deletedIssue.emit(this.issue().id);
    }
  }

  handleEdit(): void {
    this.editForm.patchValue({
      title: this.issue().title,
      description: this.issue().description,
      status: this.issue().status,
      priority: this.issue().priority,
    });
    this.isEditing.set(true);
  }

  handleCancel(): void {
    this.isEditing.set(false);
    this.editForm.reset();
  }

  handleSave(): void {
    if (this.editForm.invalid) return;

    const updatedIssue: Issue = {
      id: this.issue().id,
      ...(this.editForm.value as Omit<Issue, 'id'>),
    };

    this.updatedIssue.emit(updatedIssue);
    this.isEditing.set(false);
  }
}
