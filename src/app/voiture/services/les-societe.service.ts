import { Injectable } from '@angular/core';
import { LesScoietes } from '../models/les-societes.model';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environements/environment';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class LesSocieteService {
  API_URL: string = environment.apiUrl;
  BASE_PATH: string = '/sogeacongo/v1/';
  
  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ) { }

  getList(): Observable<LesScoietes[]> {
    return this.http.get<LesScoietes[]>(`${this.API_URL}/sogeacongo/v1/LES_SOCIETES`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  getOne(IDLesScoietes: string): Observable<LesScoietes> {
    return this.http.get<LesScoietes>(`${this.API_URL}/sogeacongo/v1/LES_SOCIETES/${IDLesScoietes}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  update(lesSocietes: LesScoietes): Observable<LesScoietes> {
    return this.http.put<LesScoietes>(`${this.API_URL}/sogeacongo/v1/LES_SOCIETES/${lesSocietes.IDLesSocietes}`, lesSocietes,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  delete(IDLesSocietes: number): Observable<string> {
    return this.http.delete<string>(`${this.API_URL}/sogeacongo/v1/LES_SOCIETES/${IDLesSocietes}`,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  create(lesSocietes: LesScoietes): Observable<LesScoietes> {
    return this.http.post<LesScoietes>(`${this.API_URL}/sogeacongo/v1/LES_SOCIETES`, lesSocietes,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }
}
