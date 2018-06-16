import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

	commentForm: FormGroup;
	value: any;
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public viewCtrl: ViewController,
				public formBuilder: FormBuilder) {
		this.commentForm = this.formBuilder.group({
			name: ['', Validators.required],
			rating: 5,
			comment: ['', Validators.required]
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CommentPage');
	}

	dismissWindow() {
		this.viewCtrl.dismiss();
	}

	onSubmit() {
		this.viewCtrl.dismiss(this.commentForm.value);
	}

}
