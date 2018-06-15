import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';

import 'rxjs/add/operator/map';

/*
  Generated class for the FavouriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavouriteProvider {

  favourites: Array<any>;

  constructor(public http: Http,
  			  private dishservice: DishProvider) {
    console.log('Hello FavoriteProvider Provider');
    this.favourites = [];
  }

  addFavourite(id: number): boolean {
  	if (!this.isFavourite(id)) {
	    this.favourites.push(id);
	    return true;
	}
  }

  isFavourite(id: number): boolean {
  		//some checks to see if an element is in the array or not
        return this.favourites.some(el => el === id);
  }

  getFavourites(): Observable<Dish[]> {
  	return this.dishservice.getDishes()
  		.map(dishes => dishes.filter(dish => this.favourites.some(el => el === dish.id)))
  }

  deleteFavourite(id: number): Observable<Dish[]> {
  	//searcha and check if the id is in the list of favourites
  	let index = this.favourites.indexOf(id);
  	if (index >= 0) {
  		this.favourites.splice(index, 1);
  		return this.getFavourites();
  	} else {
  		console.log('Deleting non-existent favourite', id);
  		return Observable.throw('Deleting non-existent favourite' + id);
  	}
  }

}
