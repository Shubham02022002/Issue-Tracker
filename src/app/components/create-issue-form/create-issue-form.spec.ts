import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateIssueForm } from './create-issue-form';

describe('CreateIssueForm', () => {
  let component: CreateIssueForm;
  let fixture: ComponentFixture<CreateIssueForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIssueForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateIssueForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
