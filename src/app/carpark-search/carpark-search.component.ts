import { Component, OnInit, Input } from '@angular/core';
import { CarparkService } from '../carpark.service';
import { FormControl } from  '@angular/forms';
import { CarparkComponent } from '../carpark/carpark.component';
import { Map } from 'leaflet';
import { debounceTime, distinctUntilChanged, switchMap, map, filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Value } from '../carpark';

@Component({
  selector: 'app-carpark-search',
  template: `
        <form >
          <mat-form-field>
                 <mat-icon matPrefix>search</mat-icon>
                 <input #search matInput [formControl]="iSearch" placeholder="search location" />
                 <mat-icon *ngIf="search.value" matSuffix (click)="clearSearch()">close</mat-icon>
          </mat-form-field>
        </form>

        <mat-nav-list role="list">
            <mat-list-item role="listitem" (click)="zoomInCurrentLocation()">
                <div class="mat-body-1"><span>Current Location</span></div>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item role="listitem" title="{{carpark.Development | titlecase}}" *ngFor="let carpark of carpark$ | async" (click)="zoomIn(carpark.Development)">
                <div class="mat-body-1">
                    <span>
                        {{ carpark.Development | slice:0:25 | titlecase }}
                    </span>
                    <span *ngIf="carpark.Development.length >= 25">...</span>
                </div>
            </mat-list-item>
        </mat-nav-list>`,
  styles: ['']
})
export class CarparkSearchComponent implements OnInit {

  private sResults: string[] = [];
  public iSearch: FormControl = new FormControl();
  carpark$: Observable<Value[]>;
  mapObj: Map;

  constructor(private cp: CarparkService ) { }

  ngOnInit() {
  
    this.cp.shareMapObj.subscribe(mapObj => this.mapObj = mapObj)
    
    this.carpark$ = this.iSearch.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => this.cp.searchCarPark(term) )
        )  
        
  }

  clearSearch() {
    this.iSearch.setValue('');
  }

 zoomIn(loc: string) {
    this.cp.searchCarPark(loc).subscribe(res => {
        for (let s of res) {
              sessionStorage.setItem('lat', s.Location.split(' ')[0]);
              sessionStorage.setItem('long', s.Location.split(' ')[1]);
              this.cp.onMapReady(this.mapObj);
              break;
        }
    });

  }

  zoomInCurrentLocation() {
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
             (position) => {
             
                sessionStorage.setItem('lat', position.coords.latitude.toString() );
                sessionStorage.setItem('long', position.coords.longitude.toString() );
                this.cp.onMapReady(this.mapObj);
             }, (error) => {
                 console.error(`Geolocation error: ${error}`);    
             }
         );
     } else {
         console.error('Geolocation not supported in this browser');
     }
  }       

}
