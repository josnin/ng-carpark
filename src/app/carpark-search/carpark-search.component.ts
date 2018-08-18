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
  templateUrl: './carpark-search.component.html',
  styleUrls: ['./carpark-search.component.css']
})
export class CarparkSearchComponent implements OnInit {

  private sResults: string[] = [];
  private iSearch: FormControl = new FormControl();
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



}
