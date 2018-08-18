
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CarparkNavComponent } from './carpark-nav.component';

describe('CarparkNavComponent', () => {
  let component: CarparkNavComponent;
  let fixture: ComponentFixture<CarparkNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [CarparkNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarparkNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
