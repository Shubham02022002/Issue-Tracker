import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateIssue } from '../../models/issue';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-create-issue-form',
  styleUrl: './create-issue-form.css',
  templateUrl: './create-issue-form.html',
})
export class CreateIssueForm {
  issueCreated = output<CreateIssue>();
  formClosed = output<void>();

  issueForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    if (this.issueForm.invalid) return;
    this.issueCreated.emit(this.issueForm.value as CreateIssue);
    this.issueForm.reset();
  }

  onCancel(): void {
    this.issueForm.reset();
    this.formClosed.emit();
  }
}
