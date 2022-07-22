import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiHandlerService {
  constructor(private http: HttpClient) {}
  get(path: string, params?: any, requestOptions?: any) {
    if (params) {
      params['api_key'] = environment.apiKey;
    } else {
      params = { api_key: environment.apiKey };
    }

    return this.http.get(environment.apiUrl + path, { params });
  }
}
