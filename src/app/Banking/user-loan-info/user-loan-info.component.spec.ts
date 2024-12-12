import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoanInfoComponent } from './user-loan-info.component';

describe('UserLoanInfoComponent', () => {
  let component: UserLoanInfoComponent;
  let fixture: ComponentFixture<UserLoanInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoanInfoComponent]
    });
    fixture = TestBed.createComponent(UserLoanInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
