import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLoansComponent } from './users-loans.component';

describe('UsersLoansComponent', () => {
  let component: UsersLoansComponent;
  let fixture: ComponentFixture<UsersLoansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersLoansComponent]
    });
    fixture = TestBed.createComponent(UsersLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
