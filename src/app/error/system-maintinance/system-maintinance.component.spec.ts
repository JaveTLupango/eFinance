import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMaintinanceComponent } from './system-maintinance.component';

describe('SystemMaintinanceComponent', () => {
  let component: SystemMaintinanceComponent;
  let fixture: ComponentFixture<SystemMaintinanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemMaintinanceComponent]
    });
    fixture = TestBed.createComponent(SystemMaintinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
