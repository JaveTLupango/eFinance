import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoanTermDetailsComponent } from './user-loan-term-details.component';

describe('UserLoanTermDetailsComponent', () => {
  let component: UserLoanTermDetailsComponent;
  let fixture: ComponentFixture<UserLoanTermDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoanTermDetailsComponent]
    });
    fixture = TestBed.createComponent(UserLoanTermDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
