import { Component, inject } from '@angular/core';

import { IssueCard } from '../../components/issue-card/issue-card';
import { CreateIssueForm } from '../../components/create-issue-form/create-issue-form';
import { CreateIssue, Issue } from '../../models/issue';
import { IssueService } from '../../services/issue.service';

@Component({
  imports: [IssueCard, CreateIssueForm],
  selector: 'app-issues',
  styleUrl: './issues.css',
  templateUrl: './issues.html',
})
export class Issues {
  private issueService = inject(IssueService);

  issues = this.issueService.issues;

  onDeletedIssue(id: number): void {
    this.issueService.deleteIssue(id);
  }

  onNewIssue(issue: CreateIssue): void {
    const id =
      this.issues().length > 0 ? Math.max(...this.issues().map((issue) => issue.id)) + 1 : 1;

    const newIssue: Issue = { ...issue, id };

    this.issues.update((issues) => [...issues, newIssue]);
  }
}
