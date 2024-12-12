import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundDashboardComponent } from './fund-dashboard.component';

describe('FundDashboardComponent', () => {
  let component: FundDashboardComponent;
  let fixture: ComponentFixture<FundDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundDashboardComponent]
    });
    fixture = TestBed.createComponent(FundDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
