import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCreateLoanRequestComponent } from './users-create-loan-request.component';

describe('UsersCreateLoanRequestComponent', () => {
  let component: UsersCreateLoanRequestComponent;
  let fixture: ComponentFixture<UsersCreateLoanRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersCreateLoanRequestComponent]
    });
    fixture = TestBed.createComponent(UsersCreateLoanRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
