import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environements/environment';
import { Ville } from '../models/ville.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  API_URL: string = environment.apiUrl;
  BASE_PATH: string = '/sogeacongo/v1/Ville';

  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ) { }


  getList(): Observable<Ville[]> {
    return this.http.get<Ville[]>(`${this.API_URL}${this.BASE_PATH}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  getOne(IDville: string): Observable<Ville> {
    return this.http.get<Ville>(`${this.API_URL}${this.BASE_PATH}/${IDville}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  
  update(ville: Ville): Observable<Ville> {
    return this.http.put<Ville>(`${this.API_URL}${this.BASE_PATH}/${ville.IDville}`, ville,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  delete(IDville: string): Observable<string> {
    return this.http.delete<string>(`${this.API_URL}${this.BASE_PATH}/${IDville}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  create(ville: Ville): Observable<Ville> {
    return this.http.post<Ville>(`${this.API_URL}${this.BASE_PATH}`, ville,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  
}
