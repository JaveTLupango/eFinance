import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoanMonitoringComponent } from './admin-loan-monitoring.component';

describe('AdminLoanMonitoringComponent', () => {
  let component: AdminLoanMonitoringComponent;
  let fixture: ComponentFixture<AdminLoanMonitoringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLoanMonitoringComponent]
    });
    fixture = TestBed.createComponent(AdminLoanMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
