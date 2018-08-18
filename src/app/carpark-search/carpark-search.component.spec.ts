import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarparkSearchComponent } from './carpark-search.component';

describe('CarparkSearchComponent', () => {
  let component: CarparkSearchComponent;
  let fixture: ComponentFixture<CarparkSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarparkSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarparkSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
