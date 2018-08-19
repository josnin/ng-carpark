import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'
import { latLng, tileLayer, polyline, marker, icon, DivIcon, Map, point } from 'leaflet';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, filter, tap, catchError } from 'rxjs/operators';
import { RootObject, Value } from './carpark';

const httpOptions = { 
    headers: new HttpHeaders({ 'AccountKey': environment.LTA_ACCOUNT_KEY, 'Accept': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CarparkService {

  private carparkUrl = 'api/CarParkAvail';

  shareMapObjSrc = new BehaviorSubject(null);
  shareMapObj = this.shareMapObjSrc.asObservable();

  constructor(private http: HttpClient) { }

  onMapReady(map: Map) {
      let route = polyline([[parseFloat(sessionStorage.getItem('lat')), parseFloat(sessionStorage.getItem('long'))]]);
      map.fitBounds(route.getBounds(), {
        padding: point(24, 24),
        maxZoom: 19,
        animate: true
      });
   }

  /* GET carpark whose address contains search term */
  searchCarPark(term: string, limit: number = 7): Observable<Value[]> {
      
    if (!term.trim()) {
      // if not search term, return empty carpark array.
      return of([]);
    }
      
    return this.getCarPark() 
        .pipe(
            map(res => {    
                // still dont know why using filter outside wont work????
                const items = res.value.filter(
                    res1 => res1.Development.toLowerCase().includes(term.trim().toLowerCase()) 
                )
                return items.splice(0, limit)
            }), 
            //      catchError(error => console.error(error))
        );
  }


  getCarPark(): Observable<any> {
    const url = `${this.carparkUrl}`
    return this.http.get<RootObject>(url, httpOptions)
  }

  /* build map obj */
  buildMapObj(): Observable<any> { //dont know the sctructure yet
      return this.getCarPark() 
        .pipe(
            map(res => {    

                    let layers1 = [];
                    let omOpt = {};
                    
                    // Define our base layers so we can reference them multiple times
                    let om = tileLayer('https://maps-{s}.onemap.sg/v3/Grey/{z}/{x}/{y}.png', {
                        detectRetina: true,
                        attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> Map Data &copy; <a href="https://onemap.sg">OneMap Singapore</a> contributions'
                    });

                    for ( let r of res.value.filter(res1 => res1.AvailableLots != 0) ) {

                           let cStroke = "#3949ab"
                           let cFill = "#c5cae9"

                           //if (r.AvailableLots == 0) { //red
                           //     cStroke = "#e44e4e"
                           //     cFill = "#ee9090"
                           // }

                            // Marker 
                            let lat: number = parseFloat(r.Location.split(' ')[0]);
                            let long1: number = parseFloat(r.Location.split(' ')[1]);
                            if (lat && long1) {
                                layers1.push(marker([lat, long1], {
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
                    }

                    layers1.push(om);
                    
                    omOpt = {
                                layers: layers1,
                                zoom: 11,
                                center: latLng([1.290270, 103.851959])
                                };


                     return omOpt  

                
                }
            )


        );
  
  }


}
