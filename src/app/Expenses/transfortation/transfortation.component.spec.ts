import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfortationComponent } from './transfortation.component';

describe('TransfortationComponent', () => {
  let component: TransfortationComponent;
  let fixture: ComponentFixture<TransfortationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransfortationComponent]
    });
    fixture = TestBed.createComponent(TransfortationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
