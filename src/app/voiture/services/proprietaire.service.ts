import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environements/environment';
import { Proprietaire } from '../models/proprietaire.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class ProprietaireService {

  API_URL: string = environment.apiUrl;
  BASE_PATH: string = '/sogeacongo/v1/Propietaire';

  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ) { }


  getList(): Observable<Proprietaire[]> {
    const url = `${this.API_URL}${this.BASE_PATH}`;
    return this.http.get<Proprietaire[]>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }


  getOne(IDProprietaire: string): Observable<Proprietaire> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDProprietaire}`;
    return this.http.get<Proprietaire>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }


  update(proprietaire: Proprietaire): Observable<Proprietaire> {
    const url = `${this.API_URL}${this.BASE_PATH}/${proprietaire.IDProprietaire}`;
    return this.http.put<Proprietaire>(url, proprietaire,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  delete(IDProprietaire: string): Observable<string> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDProprietaire}`;
    return this.http.delete<string>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  create(proprietaire: Proprietaire): Observable<Proprietaire> {
    const url = `${this.API_URL}${this.BASE_PATH}`;
    return this.http.post<Proprietaire>(url, proprietaire,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
}
