import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) {
  }

  private static getHeader(): { headers: HttpHeaders } {
    const headerDict = {
      'Content-Type': 'application/json'
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return requestOptions;
  }

  get(url: string): Observable<any> {
      return this.http.get<any>(`${url}`, HttpService.getHeader());
  }

}
