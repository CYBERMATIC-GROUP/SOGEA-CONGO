import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environements/environment';
import { Societe } from '../models/societe.model';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class SocieteService {
  API_URL: string = environment.apiUrl;
  BASE_PATH: String = '/sogeacongo/v1/';

  constructor( private http: HttpClient, private globalService:GlobalService) { }

  getList(): Observable<Societe[]> {
    const url = `${this.API_URL}${this.BASE_PATH}/Societe`;
    return this.http.get<Societe[]>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  create(societe: Societe): Observable<Societe> {
    const url = `${this.API_URL}${this.BASE_PATH}/Societe`;
    return this.http.post<Societe>(url, societe,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  get(IDSociete: string): Observable<Societe> {
    const url = `${this.API_URL}${this.BASE_PATH}/Societe/${IDSociete}`;
    return this.http.get<Societe>(url,{headers: this.globalService.getHeaders()});
  }
  

  delete(IDSociete: string): Observable<string> {
    const url = `${this.API_URL}${this.BASE_PATH}/Societe/${IDSociete}`;
    return this.http.delete<string>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  update(societe: Societe): Observable<Societe> {
    const url = `${this.API_URL}${this.BASE_PATH}/Societe/${societe.IDSociete}`;
    return this.http.put<Societe>(url, societe,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

}
