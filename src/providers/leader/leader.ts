import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Leader } from '../../shared/leader';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../../shared/baseurl';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {

  res;
  constructor(public http: Http) {

  }

  getLeaders(): Observable<Leader[]> {
  	return this.http.get(baseURL + 'leaders')
                    .map(res => res.json());
  }

  getLeader(id: number): Observable<Leader> {
 	return this.http.get(baseURL + 'leaders/' + id)
  		.map (res => res.json());
  }

  getFeaturedLeader(): Observable<Leader> {
  	return this.http.get(baseURL + 'leaders?featured=true')
  		.map (res => res.json()[0]);
  }

}
