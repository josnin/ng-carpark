import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'
import { map } from 'rxjs/operators';
import { latLng, tileLayer, polyline, marker, icon } from 'leaflet';

const httpOptions = { 
    headers: new HttpHeaders({ 'AccountKey': environment.LTA_ACCOUNT_KEY, 'Accept': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CarparkService {

  private carparkUrl = 'api/CarParkAvail';

  constructor(private http: HttpClient) { }

  getCarParkAvail() {
    const url = `${this.carparkUrl}`;
    return this.http.get<any>(url, httpOptions);
  }
}
