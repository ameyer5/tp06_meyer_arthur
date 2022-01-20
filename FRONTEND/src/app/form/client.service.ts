import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {delay, map} from 'rxjs/operators';
import { Client } from './client';

import { empty, EMPTY, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  apiUrl: string = 'https://tpbackend-amy.herokuapp.com/api/client';
  httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  };

  constructor(private httpClient: HttpClient) { }


  public logToApi(login: string, password: string): Observable<any>{
    console.log("Logging to backend with " + login + " " + password);
    this.httpClient.post<any>(
      "https://tpbackend-amy.herokuapp.com/api/client/login",
      JSON.stringify(
        {login: login, password: password}
      ),
      this.httpOptions
    ).subscribe(
      res => {
        return res;
      },
      err => {
        console.log('Error occured');
        return err;
      });

    return empty().pipe(delay(5000));
  }

  public newClientApi(client: Client) : Observable<any> {
    this.httpClient.post<Client>("https://tpbackend-amy.herokuapp.com/api/client/new", client).subscribe(
      res => {
        return res;
      },
      err => {
        console.log('Error occured on login');
      });

    return empty().pipe(delay(5000));
  }
}
