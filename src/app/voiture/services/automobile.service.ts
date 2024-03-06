import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environements/environment';
import { Automobile, filterAuto } from '../models/automobile.models';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class AutomobileService {
  API_URL: string = environment.apiUrl;
  BASE_PATH: String = '/sogeacongo/v1/';

  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ) { }

  getList(filter: filterAuto = {}): Observable<Automobile[]> {
    const url = `/sogeacongo/v1/AutomobilesGetListe`;
    const data = filter;
  
    return this.globalService.setHttpRequest(url, "POST", data)
  }

  

  getOne(IDAutomobiles: number): Observable<Automobile> {
    const url = `${this.API_URL}${this.BASE_PATH}AutomobilesGetListe`;
    const data = { IDAutomobiles: IDAutomobiles };
    return this.http.post<Automobile>(url, data,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  

  update(automobile: Automobile): Observable<Automobile> {
    const url = `${this.API_URL}${this.BASE_PATH}Automobiles/${automobile.IDAutomobiles}`;
    return this.http.put<Automobile>(url, automobile,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }


  delete(IDAutomobiles: number): Observable<string> {
    const url = `${this.API_URL}${this.BASE_PATH}Automobiles/${IDAutomobiles}`;
    return this.http.delete<string>(url,{headers: this.globalService.getHeaders()});
  }
  

  create(automobile: Automobile): Observable<Automobile> {
    const url = `${this.API_URL}/sogeacongo/v1/Automobiles`;
    return this.http.post<Automobile>(url, automobile,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  filtrer(automobile: Automobile): Observable<Automobile[]> {
    const url = `${this.API_URL}${this.BASE_PATH}AutomobilesGetListe`;
    return this.http.post<Automobile[]>(url, automobile,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
  
}
