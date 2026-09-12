import { Injectable, signal } from '@angular/core';
import { Issue, CreateIssue } from '../models/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  issues = signal<Issue[]>([
    {
      id: 1,
      title: 'Fix bug in user authentication',
      status: 'open',
      priority: 'high',
      description: 'Resolve the issue causing login failures for some users.',
    },
    {
      id: 2,
      title: 'Add project dashboard',
      status: 'open',
      priority: 'medium',
      description: 'Create a dashboard to display project statistics and progress.',
    },
    {
      id: 3,
      title: 'Implement dark mode',
      status: 'open',
      priority: 'low',
      description: 'Add a dark mode option to improve user experience in low-light environments.',
    },
    {
      id: 4,
      title: 'Optimize database queries',
      status: 'open',
      priority: 'high',
      description: 'Improve the performance of database queries to reduce load times.',
    },
    {
      id: 5,
      title: 'Add search functionality',
      status: 'open',
      priority: 'medium',
      description: 'Implement a search feature to allow users to find issues quickly.',
    },
  ]);

  addIssue(issue: CreateIssue): Issue {
    const id =
      this.issues().length > 0 ? Math.max(...this.issues().map((issue) => issue.id)) + 1 : 1;

    const newIssue: Issue = { ...issue, id };

    this.issues.update((issues) => [...issues, newIssue]);

    return newIssue;
  }

  deleteIssue(issueId: number) {
    this.issues.update((issues) => issues.filter((issue) => issue.id !== issueId));
  }

  updateIssue(updatedIssue: Issue) {
    this.issues.update((issues) =>
      issues.map((issue) => (issue.id === updatedIssue.id ? updatedIssue : issue)),
    );
  }
}
