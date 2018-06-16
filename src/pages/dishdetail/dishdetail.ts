import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';

import { Dish } from '../../shared/dish';

import { FavouriteProvider } from '../../providers/favourite/favourite';
import { CommentPage } from '../../pages/comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

	dish: Dish;
	errMess: string;
	avgstars: string;
	numcomments: number;
	favourite: boolean;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				@Inject ('BaseURL') public BaseURL,
				private toastCtrl: ToastController,
				private actionSheetCtrl: ActionSheetController,
				private modalCtrl: ModalController,
				private favouriteservice: FavouriteProvider) {

		this.dish = navParams.get('dish');
		this.favourite = favouriteservice.isFavourite(this.dish.id);
		this.numcomments = this.dish.comments.length;

		let total = 0;
		this.dish.comments.forEach(comment => total += comment.rating);
		this.avgstars = (total/this.numcomments).toFixed(2);

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DishdetailPage');
	}

	addToFavorites() {
	    console.log('Adding to Favorites', this.dish.id);
	    this.favourite = this.favouriteservice.addFavourite(this.dish.id);
		this.toastCtrl.create({
			message: 'Dish ' + this.dish.id + ' added successfully',
			position: 'middle',
			duration: 3000
		}).present();
	}

	openComment() {
	    let modal = this.modalCtrl.create(CommentPage);
	    modal.onDidDismiss(data => {
	    	console.log(data);
	    	const date: Date = new Date();
    		this.dish.comments.push({
				rating: data.rating,
				author: data.name,
				comment: data.comment,
				date: date.toISOString()
			});
		});
	    modal.present();
	}

	actionSheet() {
		let actionSheet = this.actionSheetCtrl.create({
			title: "Options",
			buttons: [
				{
					text: 'Add to Favourites',
					handler: () => {
						this.addToFavorites();
					}
				}, {
					text: 'Add a Comment',
					handler: () => {
						this.openComment();
					}
				}, {
					text: 'Cancel',
					role: 'cancel'
				}
			]
		});
		actionSheet.present();
	}

}
