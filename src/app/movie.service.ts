import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  constructor(private http:HttpClient) { }

  getMovies(page: number): Observable<ApiResult> {
    const params = new HttpParams().set('api_key', environment.apiKey).set('page', page.toString());
    return this.http.get<ApiResult>(`${environment.baseUrl}/discover/movie`, { params });
  }

  getMovieDetails(id: string): Observable<any> {
    const params = new HttpParams().set('api_key', environment.apiKey);
    
    return this.http.get<any>(`${environment.baseUrl}/movie/${id}`, { params });
  }

  searchMovies(query: string): Observable<ApiResult> {
    const params = new HttpParams().set('api_key', environment.apiKey).set('query', query);

    return this.http.get<ApiResult>(`${environment.baseUrl}/search/movie`, { params });
  }
}
