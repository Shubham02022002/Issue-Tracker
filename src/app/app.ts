import { Component, computed, signal } from '@angular/core';
import { IssueCard } from './components/issue-card/issue-card';

export interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}

@Component({
  imports: [IssueCard],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
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

  onDeletedIssue(id: number): void {
    this.issues.update((issues) => issues.filter((issue) => issue.id !== id));
  }
}
