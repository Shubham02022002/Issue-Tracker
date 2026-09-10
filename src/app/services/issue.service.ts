import { Injectable, signal } from '@angular/core';
import { Issue } from '../models/issue';

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

  deleteIssue(issueId: number) {
    this.issues.update((issues) => issues.filter((issue) => issue.id !== issueId));
  }
}
