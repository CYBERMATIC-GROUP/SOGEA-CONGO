import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environements/environment';
import { Liasse } from '../models/liasse.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class LiasseService {

  API_URL: string = environment.apiUrl
  uriLiasse: string = "/sogeacongo/v1/LIASSE";

  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ) { }


  getList(): Observable<Liasse[]> {
    return this.http.get<Liasse[]>(`${this.API_URL}${this.uriLiasse}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }


  get(IDliasse: string = "0"): Observable<Liasse> {
    const uri: string = IDliasse !== "0" ? `${this.uriLiasse}/${IDliasse}` : this.uriLiasse;
    return this.http.get<Liasse>(`${this.API_URL}${uri}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  

  //La création


  create(liasse: Liasse): Observable<Liasse> {
    return this.http.post<Liasse>(`${this.API_URL}${this.uriLiasse}`, liasse,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  //Mise à jour

  update(liasse: Liasse): Observable<Liasse> {
    const url = `${this.API_URL}${this.uriLiasse}/${liasse.IDLIASSE}`;
    return this.http.put<Liasse>(url, liasse,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  //La suppression

  delete(IDliasse: string): Observable<Liasse> {
    const url = `${this.API_URL}${this.uriLiasse}/${IDliasse}`;
    return this.http.delete<Liasse>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

}
