import { Injectable, OnInit } from '@angular/core';
import { Departement } from '../models/departement.models';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environements/environment';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  API_URL: string = environment.apiUrl;
  BASE_PATH: String = '/sogeacongo/v1/';

  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ) { }

  getList(): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.API_URL}${this.BASE_PATH}Departement`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  getOne(IDDEPARTEMENT: number): Observable<Departement> {
    return this.http.get<Departement>(`${this.API_URL}${this.BASE_PATH}Departement/${IDDEPARTEMENT}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  update(departement: Departement): Observable<Departement>{
    return this.http.put<Departement>(`${this.API_URL}${this.BASE_PATH}Departement/${departement.IDDEPARTEMENT}`, departement,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  delete(IDDEPARTEMENT: number): Observable<string>{
    return this.http.delete<string>(`${this.API_URL}${this.BASE_PATH}Departement/${IDDEPARTEMENT}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  create(departement: Departement): Observable<Departement>{
    return this.http.post<Departement>(`${this.API_URL}${this.BASE_PATH}Departement`, departement,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

}
