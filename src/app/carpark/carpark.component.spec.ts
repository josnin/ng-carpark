import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarparkComponent } from './carpark.component';

describe('CarparkComponent', () => {
  let component: CarparkComponent;
  let fixture: ComponentFixture<CarparkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarparkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarparkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
