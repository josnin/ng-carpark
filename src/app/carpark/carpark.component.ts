import { Component, OnInit } from '@angular/core';
import { CarparkService } from '../carpark.service';

import { latLng, tileLayer, polyline, marker, icon, DivIcon } from 'leaflet';

@Component({
  selector: 'app-carpark',
  templateUrl: './carpark.component.html',
  styleUrls: ['./carpark.component.css']
})
export class CarparkComponent implements OnInit {

    private carpark: any;
    private options: any;


  constructor(private cp: CarparkService ) { }

  ngOnInit() {

  this.cp.getCarParkAvail().subscribe(res => {
  
            let layers1 = [];
            let omOpt = {};
            
            // Define our base layers so we can reference them multiple times
            let om = tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
                detectRetina: true,
                attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> Map Data &copy; <a href="https://onemap.sg">OneMap Singapore</a> contributions'
            });


            for ( let r of res.value ) {

                        let cStroke = "#4ee44e"
                        let cFill = "#90ee90"

                   if (r.AvailableLots == 0) { //red
                        cStroke = "#e44e4e"
                        cFill = "#ee9090"
                    }

                    // Marker 
                    layers1.push(marker(r.Location.split(' '), {
                    icon: new DivIcon({
                            className: 'my-div-icon',
                            html: `<svg height="50" width="50"> <circle cx="25" cy="25" r="20" 
                                    stroke="${cStroke}" stroke-width="2" fill="${cFill}" /><text x="25" y="25" 
                                    text-anchor="middle" stroke-width="2" fill="black" dy=".3em">${r.AvailableLots}</text></svg>`
                          })
                          }).bindPopup(`<div><strong>CarParkID:</strong> ${r.CarParkID}</div>
                                        <div><strong>Development:</strong> ${r.Development}</div>
                                        <div><strong>LotType:</strong> ${r.LotType}</div>
                                        <div><strong>AvailableLots:</strong> ${r.AvailableLots}</div>`)
                    ) 
            }

            layers1.push(om);
            
            omOpt = {
                        layers: layers1,
                        zoom: 11,
                        center: latLng([1.290270, 103.851959])
                        };

                        this.options = omOpt;  
                        console.log(res);
                        this.carpark = res;

        
        
        }
    );
  }

}
