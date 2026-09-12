import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IssueCard } from '../../components/issue-card/issue-card';
import { CreateIssueForm } from '../../components/create-issue-form/create-issue-form';
import { CreateIssue, Issue, Status } from '../../models/issue';
import { IssueService } from '../../services/issue.service';

@Component({
  imports: [IssueCard, CreateIssueForm, FormsModule],
  selector: 'app-issues',
  styleUrl: './issues.css',
  templateUrl: './issues.html',
})
export class Issues {
  private issueService = inject(IssueService);

  issues = this.issueService.issues;
  showCreateForm = signal(false);
  searchQuery = signal('');
  selectedStatus = signal<Status | null>(null);
  sortBy = signal<'newest' | 'oldest' | 'priority'>('newest');

  filteredIssues = computed(() => {
    let result = this.issues();

    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      result = result.filter(
        (issue) =>
          issue.title.toLowerCase().includes(query) ||
          issue.description.toLowerCase().includes(query)
      );
    }

    if (this.selectedStatus()) {
      result = result.filter((issue) => issue.status === this.selectedStatus());
    }

    const sorted = [...result];
    const sortType = this.sortBy();

    if (sortType === 'newest') {
      sorted.reverse();
    } else if (sortType === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    return sorted;
  });

  toggleCreateForm(): void {
    this.showCreateForm.update((value) => !value);
  }

  filterByStatus(status: Status | null): void {
    this.selectedStatus.set(status);
  }

  getFilterTitle(): string {
    const status = this.selectedStatus();
    if (!status) return 'All Issues';
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ') + ' Issues';
  }

  onDeletedIssue(id: number): void {
    this.issueService.deleteIssue(id);
  }

  onUpdatedIssue(issue: Issue): void {
    this.issueService.updateIssue(issue);
  }

  onNewIssue(issue: CreateIssue): void {
    this.issueService.addIssue(issue);
    this.showCreateForm.set(false);
  }
}
