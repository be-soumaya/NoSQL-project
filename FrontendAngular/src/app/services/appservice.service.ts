import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { NFTsales } from '../models/nftsales.model';

const baseUrl = 'http://localhost:8000/api/apps';
@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<NFTsales[]> {
    return this.http.get<NFTsales[]>(baseUrl);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }
  
  findByDate(Date: any): Observable<NFTsales[]> {
    return this.http.get<NFTsales[]>(`${baseUrl}?date=${Date}`);
  }
}
