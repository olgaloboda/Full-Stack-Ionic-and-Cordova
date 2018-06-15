import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { DishdetailPage } from '../dishdetail/dishdetail';

import { FavouriteProvider } from '../../providers/favourite/favourite';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {

	dishes: Dish[];
	// errMess: string;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private dishservice: DishProvider,
				private favouriteservice: FavouriteProvider,
				@Inject('BaseURL') private BaseURL) { }

	ngOnInit() {
		this.dishservice.getDishes()
	  		.subscribe(dishes => this.dishes = dishes);
	    			   // errmess => this.errMess = <any>errmess);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MenuPage');
	}

	dishSelected(dish) {
		// That's right, we're pushing to ourselves!
		this.navCtrl.push(DishdetailPage, {
			dish: dish
		});
	}

	addToFavourites(dish: Dish) { 
	    console.log('Adding to Favorites', dish.id);
	    this.favouriteservice.addFavourite(dish.id);
	}

}
