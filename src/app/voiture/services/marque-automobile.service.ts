import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environements/environment';
import { MarqueAutomobile } from '../models/marqueAutomobile';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root',
})
export class MarqueAutomobileService {
  API_URL: string = environment.apiUrl;
  BASE_PATH: String = '/sogeacongo/v1/MarqueAutomobile';

  constructor(private http: HttpClient, private globalService:GlobalService) {}

  getList(): Observable<MarqueAutomobile[]> {
    return this.http.get<MarqueAutomobile[]>(`${this.API_URL}${this.BASE_PATH}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  getOne(IDMarqueAutomobile: number): Observable<MarqueAutomobile> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDMarqueAutomobile}`;
    return this.http.get<MarqueAutomobile>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  update(marque: MarqueAutomobile): Observable<MarqueAutomobile> {
    const url = `${this.API_URL}${this.BASE_PATH}/${marque.IDMarqueAutomobile}`;
    return this.http.put<MarqueAutomobile>(url, marque,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  delete(IDGenre: number): Observable<string> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDGenre}`;
    return this.http.delete<string>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  create(marque: MarqueAutomobile): Observable<MarqueAutomobile> {
    return this.http.post<MarqueAutomobile>(`${this.API_URL}${this.BASE_PATH}`, marque,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
}
