import { Component, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-carpark-nav',
  templateUrl: './carpark-nav.component.html',
  styleUrls: ['./carpark-nav.component.css']
})
export class CarparkNavComponent {

  private title = "SG Car Park";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver) {}

  
  }
