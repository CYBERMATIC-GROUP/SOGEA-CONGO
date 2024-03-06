import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environements/environment';
import { SourceEnergie } from '../models/source-energie';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class SourceEnergieService {
  API_URL: string = environment.apiUrl;
  BASE_PATH: String = '/sogeacongo/v1/';

  constructor( private http: HttpClient, private globalService:GlobalService ) { }

  getList(): Observable<SourceEnergie[]> {
    const url = `${this.API_URL}${this.BASE_PATH}SourceEnergie`;
    return this.http.get<SourceEnergie[]>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  create(source: SourceEnergie): Observable<SourceEnergie> {
    const url = `${this.API_URL}${this.BASE_PATH}SourceEnergie`;
    return this.http.post<SourceEnergie>(url, source,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  
  get(IDSourceEnergie: number): Observable<SourceEnergie> {
    const url = `${this.API_URL}${this.BASE_PATH}SourceEnergie/${IDSourceEnergie}`;
    return this.http.get<SourceEnergie>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  delete(IDSourceEnergie: number): Observable<SourceEnergie> {
    const url = `${this.API_URL}${this.BASE_PATH}SourceEnergie/${IDSourceEnergie}`;
    return this.http.delete<SourceEnergie>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  update(source: SourceEnergie): Observable<SourceEnergie> {
    const url = `${this.API_URL}${this.BASE_PATH}SourceEnergie/${source.IDSourceEnergie}`;
    return this.http.put<SourceEnergie>(url, source,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  
}
