import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesOfHundredComponent } from './rules-of-hundred.component';

describe('RulesOfHundredComponent', () => {
  let component: RulesOfHundredComponent;
  let fixture: ComponentFixture<RulesOfHundredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RulesOfHundredComponent]
    });
    fixture = TestBed.createComponent(RulesOfHundredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
