export type Priority = 'low' | 'medium' | 'high';
export type Status = 'open' | 'in_progress' | 'closed';

export interface Issue {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
}
export type CreateIssue = Omit<Issue, 'id'>;
