import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyFundComponent } from './emergency-fund.component';

describe('EmergencyFundComponent', () => {
  let component: EmergencyFundComponent;
  let fixture: ComponentFixture<EmergencyFundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmergencyFundComponent]
    });
    fixture = TestBed.createComponent(EmergencyFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
