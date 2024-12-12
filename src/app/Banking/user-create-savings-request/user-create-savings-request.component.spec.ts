import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateSavingsRequestComponent } from './user-create-savings-request.component';

describe('UserCreateSavingsRequestComponent', () => {
  let component: UserCreateSavingsRequestComponent;
  let fixture: ComponentFixture<UserCreateSavingsRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCreateSavingsRequestComponent]
    });
    fixture = TestBed.createComponent(UserCreateSavingsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
