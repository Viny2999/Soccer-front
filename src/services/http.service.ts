import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { config } from '../config';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class HttpService {
  
  constructor(@Inject(Http) private http: Http ) {}
  
  public getAllTimes(endpoint:string): Promise<any> {
    return this.http.get(config.heroku + endpoint).toPromise().then(response => {
      response.json().data as any;
    })
  }
} 