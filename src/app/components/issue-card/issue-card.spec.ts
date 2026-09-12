import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueCard } from './issue-card';

describe('IssueCard', () => {
  let component: IssueCard;
  let fixture: ComponentFixture<IssueCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueCard],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('issue', {
      id: 1,
      title: 'Test Issue',
      description: 'Test Description',
      status: 'open',
      priority: 'high',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
