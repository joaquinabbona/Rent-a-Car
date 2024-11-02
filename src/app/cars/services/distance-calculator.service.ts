import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistanceCalculatorService {
  private apiUrl = 'https://api.distancematrix.ai/maps/api/distancematrix/json';
  private apiKey = 'BZrwMLHBHcxNWtauPXTtthRXW9heF59YrCONgEojVSrGBQoNYHxpyWe4PhnzvXvP';

  constructor(private http: HttpClient) { }

  getDistance(origins: string, destination:string): Observable<any>{
    const params = new HttpParams()
    .set('origins', origins)
    .set('destinations', destination)
    .set('key', this.apiKey);
    return this.http.get(this.apiUrl, {params: params});
  }
}
