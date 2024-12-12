import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestInsuranceComponent } from './invest-insurance.component';

describe('InvestInsuranceComponent', () => {
  let component: InvestInsuranceComponent;
  let fixture: ComponentFixture<InvestInsuranceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestInsuranceComponent]
    });
    fixture = TestBed.createComponent(InvestInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
