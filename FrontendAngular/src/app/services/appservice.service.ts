import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

const baseUrl = 'http://localhost:8000/api/apps';
@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(baseUrl);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }
  
  findByTitle(title: any): Observable<Article[]> {
    return this.http.get<Article[]>(`${baseUrl}?title=${title}`);
  }
}
