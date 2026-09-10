import { Component, input, output } from '@angular/core';
import { Issue } from '../../app';

@Component({
  imports: [],
  selector: 'app-issue-card',
  styleUrl: './issue-card.css',
  templateUrl: './issue-card.html',
})
export class IssueCard {
  issue = input.required<Issue>();
  deletedIssue = output<number>();

  handleDelete(): void {
    this.deletedIssue.emit(this.issue().id);
  }
}
