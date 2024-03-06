import { Injectable, OnInit } from '@angular/core';
import { EMPTY, Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environements/environment';
import { Arrondissement } from '../models/arrondissement.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class ArrondissementService {


  API_URL: string = environment.apiUrl;
  BASE_PATH: String = '/sogeacongo/v1/Arrondissement';
  uriRessource:string = "/sogeacongo/v1/GetRessource/Arrondissement"


  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ) { }

  getList(iddepartement: string): Observable<Arrondissement[]> {
    const url = `${this.API_URL}${this.uriRessource}`;
    const data = {
      IDDEPARTEMENT: iddepartement
    };
    return this.http.post<Arrondissement[]>(url, data).pipe(
      tap((res: any) => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
 
        return EMPTY;
      }));
  }
  handleError(error: any) {
    throw new Error('Method not implemented.');
  }


  getOne(IDARRONDISSEMENT: string): Observable<Arrondissement> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDARRONDISSEMENT.toString()}`;
    return this.http.get<Arrondissement>(url).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
 
        return EMPTY;
      }));
  }

  update(arrondissement: Arrondissement): Observable<Arrondissement> {
    const url = `${this.API_URL}${this.BASE_PATH}/${arrondissement.IDARRONDISSEMENT.toString()}`;
    return this.http.put<Arrondissement>(url, arrondissement).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
 
        return EMPTY;
      }));
  }

  delete(IDARRONDISSEMENT: string): Observable<string> {
    const url = `${this.API_URL}${this.BASE_PATH}/${IDARRONDISSEMENT.toString()}`;
    return this.http.delete<string>(url).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
 
        return EMPTY;
      }));
  }

  create(arrondissement: Arrondissement): Observable<Arrondissement> {
    const url = `${this.API_URL}${this.BASE_PATH}`;
    return this.http.post<Arrondissement>(url, arrondissement).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
 
        return EMPTY;
      }));
  }


  RecuperationDepartement(iddepartement: string): Observable<Arrondissement[]> {
    const url = `${this.API_URL}${this.uriRessource}`;
    const data = {
      IDDEPARTEMENT: iddepartement
    };
    return this.http.post<Arrondissement[]>(url, data).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
 
        return EMPTY;
      }));
  }

}
