import { Injectable } from '@angular/core';
import { environment } from 'src/environements/environment';
import { Departement } from '../models/departement.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  API_URL: string = environment.apiUrl;
  BASE_PATH: String = '/sogeacongo/v1/';

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  getList(): Observable<Departement[]> {
    const url = `${this.API_URL}${this.BASE_PATH}Departement`;
    return this.http.get<Departement[]>(url,{headers: this.globalService.getHeaders()});
  }
  

  /*getOne(idCategory: number): Observable<Category> {
    
    return this.http.post<Category>(this.API_URL, {
      method: 'GET',
      route: this.BASE_PATH + "Categories/" + idCategory.toString()
    });
  }

  update(category: Category): Observable<Category>{
    return this.http.post<Category>(this.API_URL, {
      method: 'GET',
      route: this.BASE_PATH + "Categories/" + category.IDCategories.toString(),
      data: category
    });
  }

  delete(IDCategories: number): Observable<string>{
    return this.http.post<string>(this.API_URL, {
      method: 'DELETE',
      route: this.BASE_PATH + "Categories/" + IDCategories.toString()
    });
  }

  create(category: Category): Observable<Category>{
    return this.http.post<Category>(this.API_URL, {
      method: 'POST',
      route: this.BASE_PATH + "Categories/",
      data: category
    });
  }*/
}
