import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../../shared/baseurl';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {

  constructor(public http: Http) {

  }

  getDishes(): Observable<Dish[]> {
  	return this.http.get(baseURL + 'dishes')
      .map(res => res.json());
  }

  getDish(id: number): Observable<Dish> {
 	return this.http.get(baseURL + 'dishes/' + id)
  		.map (res => res.json());
  }

  getFeaturedDish(): Observable<Dish> {
  	return this.http.get(baseURL + 'dishes?featured=true')
  		.map (res => res.json()[0]);
  }

}
