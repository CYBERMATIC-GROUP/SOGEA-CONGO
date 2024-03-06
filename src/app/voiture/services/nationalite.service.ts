import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environements/environment';
import { Nationalite } from '../models/nationalite.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class NationaliteService {

  API_URL: string = environment.apiUrl;
  BASE_PATH: string = '/sogeacongo/v1/Nationalite';

  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ) { }


  getList(): Observable<Nationalite[]> {
    const url = `${this.API_URL}${this.BASE_PATH}`;
    return this.http.get<Nationalite[]>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  getOne(IDNationalite: string): Observable<Nationalite> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDNationalite.toString()}`;
    return this.http.get<Nationalite>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }


  update(nationalite: Nationalite): Observable<Nationalite> {
    const url = `${this.API_URL}${this.BASE_PATH}/${nationalite.IDNationalite.toString()}`;
    return this.http.put<Nationalite>(url, nationalite,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  delete(IDNationalite: string): Observable<string> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDNationalite.toString()}`;
    return this.http.delete<string>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  create(nationalite: Nationalite): Observable<Nationalite> {
    const url = `${this.API_URL}${this.BASE_PATH}`;
    return this.http.post<Nationalite>(url, nationalite,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
}
