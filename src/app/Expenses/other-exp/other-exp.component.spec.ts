import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherExpComponent } from './other-exp.component';

describe('OtherExpComponent', () => {
  let component: OtherExpComponent;
  let fixture: ComponentFixture<OtherExpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherExpComponent]
    });
    fixture = TestBed.createComponent(OtherExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
