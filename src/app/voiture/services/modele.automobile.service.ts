import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environements/environment';
import { ModeleAutomobile } from '../models/modele.automobile.model';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class ModeleAutomobileService {
  API_URL: string = environment.apiUrl;
  BASE_PATH: String = '/sogeacongo/v1/';

  constructor( private http: HttpClient,private globalService:GlobalService ) { }

  getList(): Observable<ModeleAutomobile[]> {
    const url = `${this.API_URL}${this.BASE_PATH}/ModeleAutomobile`;
    return this.http.get<ModeleAutomobile[]>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  create(modeleAutomobile: ModeleAutomobile): Observable<ModeleAutomobile> {
    return this.http.post<ModeleAutomobile>(`${this.API_URL}${this.BASE_PATH}/ModeleAutomobile`, modeleAutomobile,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  get(IDTypeAutomobile: string): Observable<ModeleAutomobile> {
    const url = `${this.API_URL}${this.BASE_PATH}/ModeleAutomobile/${IDTypeAutomobile}`;
    return this.http.get<ModeleAutomobile>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  delete(IDTypeAutomobile: string): Observable<ModeleAutomobile> {
    const url = `${this.API_URL}${this.BASE_PATH}/ModeleAutomobile/${IDTypeAutomobile}`;
    return this.http.delete<ModeleAutomobile>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  update(ModeleAutomobile: ModeleAutomobile): Observable<ModeleAutomobile> {
    const url = `${this.API_URL}${this.BASE_PATH}/ModeleAutomobile/${ModeleAutomobile.IDTypeAutomobile}`;
    return this.http.put<ModeleAutomobile>(url, ModeleAutomobile,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
}
