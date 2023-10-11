import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSavingsComponent } from './user-savings.component';

describe('UserSavingsComponent', () => {
  let component: UserSavingsComponent;
  let fixture: ComponentFixture<UserSavingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSavingsComponent]
    });
    fixture = TestBed.createComponent(UserSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
