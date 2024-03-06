import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { TypeAutomobile } from '../models/type-automobile.models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environements/environment';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class TypeAutomobileService {

  API_URL: string = environment.apiUrl;
  BASE_PATH: string = '/sogeacongo/v1/TypeAutomobile';

  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ) { }


  getList(): Observable<TypeAutomobile[]> {
    return this.http.get<TypeAutomobile[]>(this.API_URL + this.BASE_PATH,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  getOne(IDTypeAutomobile: string): Observable<TypeAutomobile> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDTypeAutomobile}`;
    return this.http.get<TypeAutomobile>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  


  update(typeAutomobile: TypeAutomobile): Observable<TypeAutomobile> {
    const url = `${this.API_URL}${this.BASE_PATH}/${typeAutomobile.IDTypeAutomobile}`;
    return this.http.put<TypeAutomobile>(url, typeAutomobile,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  delete(IDTypeAutomobile: string): Observable<string> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDTypeAutomobile}`;
    return this.http.delete<string>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  create(typeAutomobile: TypeAutomobile): Observable<TypeAutomobile> {
    const url = `${this.API_URL}${this.BASE_PATH}`;
    return this.http.post<TypeAutomobile>(url, typeAutomobile,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  
}
