import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CarparkService } from '../carpark.service';
import { Map } from 'leaflet';


@Component({
  selector: 'app-carpark',
  template: `
        <div fxLayout="column" fxFill>
                <div fxFlex="88" fxFill *ngIf="options"  
                    leaflet
                    (leafletMapReady)="onMapReady($event)"
                    [leafletOptions]="options">
                </div> 
        </div>`,
  styles: ['.map { height: 88%; padding: 0;}'] 
})

export class CarparkComponent implements OnInit {

    public carpark: any;
    public options: any;
    mapObj: Map;

  constructor(private cp: CarparkService ) { }

  ngOnInit() {
  
        this.cp.shareMapObj.subscribe(mapObj => this.mapObj = mapObj)
  
        this.cp.buildMapObj().subscribe(res => {
                this.options = res
            
            });

  }

  onMapReady(map: Map) {
    this.cp.shareMapObjSrc.next(map)
  }



}
