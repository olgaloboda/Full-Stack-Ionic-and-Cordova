import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';

import { Dish } from '../../shared/dish';
import { FavouriteProvider } from '../../providers/favourite/favourite';

/**
 * Generated class for the FavouritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage implements OnInit {

	favourites: Dish[];
	errMess: string;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private favouriteservice: FavouriteProvider,
				@Inject('BaseURL') private BaseURL) {
	}

	ngOnInit() {
		this.favouriteservice.getFavourites()
			.subscribe(favourites => this.favourites = favourites,
					   errmess => this.errMess = errmess);

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad FavouritesPage');
	}

	deleteFavourite(item: ItemSliding, id: number) {
		console.log('delete', id);
		this.favouriteservice.deleteFavourite(id)
			.subscribe(favourites => this.favourites = favourites,
					   errmess => this.errMess = errmess);
		item.close();
	}

}
