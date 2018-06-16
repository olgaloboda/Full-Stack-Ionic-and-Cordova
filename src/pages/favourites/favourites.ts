import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, 
		ToastController, LoadingController, AlertController 
		} from 'ionic-angular';

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
				private toastCtrl: ToastController,
				private loadingCtrl: LoadingController,
				private alertCtrl: AlertController,
				@Inject('BaseURL') public BaseURL) {
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
		let alert = this.alertCtrl.create({
			title: 'Confirm Title',
			message: 'Do you want to delete favourite ' + id + '?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('Delete cancelled');
					}
				},
				{
					text: 'Delete',
					// if clicked
					handler: () => {
						let loading = this.loadingCtrl.create({
							content: 'Deleting...'
						});
						let toast = this.toastCtrl.create({
								message: 'Dish ' + id + ' deleted successfully',
								duration: 3000
						});
						loading.present();
						
						this.favouriteservice.deleteFavourite(id)
							.subscribe(favourites => {
										this.favourites = favourites; 
										loading.dismiss(); 
										toast.present();},
									errmess => {
										this.errMess = errmess; 
										loading.dismiss();
									});
					}
				}
			]
		});
		alert.present();
		item.close();
		
	}

}
