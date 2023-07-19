import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestPropertyComponent } from './invest-property.component';

describe('InvestPropertyComponent', () => {
  let component: InvestPropertyComponent;
  let fixture: ComponentFixture<InvestPropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestPropertyComponent]
    });
    fixture = TestBed.createComponent(InvestPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
