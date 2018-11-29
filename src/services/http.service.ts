import { Http, Headers } from '@angular/http';
import { config } from '../config';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class HttpService {
  headers = new Headers({
    "Content-Type": "application/json",
  });

  constructor(@Inject(Http) private http: Http ) {}
  
  public getAllTimes(endpoint:string): Promise<any> {
    return this.http.get(config.heroku + endpoint)
    .toPromise().then(response => response.json())
    .catch((error) => console.log(error))
  }
  public postTime(endpoint:string, nome:string, mini:string): Promise<any> {
    return this.http.post(config.heroku + endpoint, {nome: nome, mini: mini}, {headers: this.headers})
    .toPromise().then(response => response.json())
    .catch((error) => console.log(error))
  }

  public putTime(endpoint:string, nome:string, mini:string): Promise<any> {
    return this.http.put(config.heroku + endpoint, {nome: nome, mini: mini}, {headers: this.headers})
    .toPromise().then(response => response.json())
    .catch((error) => console.log(error))
  }

  public deleteTime(endpoint:string): Promise<any> {
    return this.http.delete(config.heroku + endpoint)
    .toPromise().then(response => response.json())
    .catch((error) => console.log(error))
  }

  public getAllPlacares(endpoint:string): Promise<any> {
    return this.http.get(config.heroku + endpoint)
    .toPromise().then(response => response.json())
    .catch((error) => console.log(error))
  }

  public postPlacar(endpoint:string, timeA:StringConstructor, timeB:StringConstructor, miniA:string , miniB:string, placarA:StringConstructor, placarB:StringConstructor): Promise<any> {
    return this.http.post(config.heroku + endpoint, {timeA: timeA, timeB: timeB, miniA: miniA, miniB: miniB, placarA: placarA, placarB: placarB}, {headers: this.headers})
    .toPromise().then(response => response.json())
    .catch((error) => console.log(error))
  }

  public putPlacar(endpoint:string, timeA:StringConstructor, timeB:StringConstructor, miniA:string , miniB:string, placarA:StringConstructor, placarB:StringConstructor): Promise<any> {
    return this.http.put(config.heroku + endpoint, {timeA: timeA, timeB: timeB, miniA: miniA, miniB: miniB, placarA: placarA, placarB: placarB}, {headers: this.headers})
    .toPromise().then(response => response.json())
    .catch((error) => console.log(error))
  }

  public deletePlacar(endpoint:string): Promise<any> {
    return this.http.delete(config.heroku + endpoint)
    .toPromise().then(response => response.json())
    .catch((error) => console.log(error))
  }
} 