import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';

// import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';

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
          
          private storage: Storage,
  			  private dishservice: DishProvider) {
      console.log('Hello FavoriteProvider Provider');

      this.storage.get('favourites').then(value => {
        if (value) {
          this.favourites = value;
        } else {
          this.favourites = [];
        }
      });
     
    }

  addFavourite(id: number): boolean {
  	if (!this.isFavourite(id)) {
	    this.favourites.push(id);
      this.storage.set('favourites', this.favourites);
	    // this.localnotifications.schedule({
     //    id: id,
     //    text: 'Dish ' + id + ' added as a favourite successfully'
     //  });
	  }

    return true;
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
      this.storage.set('favourites', this.favourites);
  		return this.getFavourites();
  	} else {
  		console.log('Deleting non-existent favourite', id);
  		return Observable.throw('Deleting non-existent favourite' + id);
  	}
  }

}
