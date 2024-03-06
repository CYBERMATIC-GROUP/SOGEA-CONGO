import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environements/environment';
import { GlobalService } from 'src/app/core/services/global.service';
import { ErrorInterface } from 'src/app/core/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  API_URL: string = environment.apiUrl;
  BASE_PATH: String = '/sogeacongo/v1/';

  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ) { }
  getList(): Observable<Category[]> {
    const url = `${this.API_URL}${this.BASE_PATH}Categories`;
    return this.http.get<Category[]>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  getOne(idCategory: number): Observable<Category> {
    const url = `${this.API_URL}${this.BASE_PATH}Categories/${idCategory}`;
    return this.http.get<Category>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  update(category: Category): Observable<Category> {
    const url = `${this.API_URL}${this.BASE_PATH}Categories/${category.IDCategories}`;
    return this.http.put<Category>(url, category,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  delete(IDCategories: number): Observable<string> {
    const url = `${this.API_URL}${this.BASE_PATH}Categories/${IDCategories}`;
    return this.http.delete<string>(url,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

  create(category: Category): Observable<Category> {
    const url = `${this.API_URL}${this.BASE_PATH}Categories`;
    return this.http.post<Category>(url, category,{headers: this.globalService.getHeaders()}).pipe(
      tap(res => res),
      
      catchError((error, caught) => {
        const err: ErrorInterface = error.error;
        console.log(err);
        this.globalService.raiseErrorServer(err.fault.detail);
        return EMPTY;
      }));
  }

}
