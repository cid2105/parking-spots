import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ParkData } from '../../providers/park-data';
import { ParkDetailsPage } from '../park-details/park-details';
import { Park } from '../../interfaces/park';

/*
  Generated class for the ParkList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-park-list',
  templateUrl: 'park-list.html'
})
export class ParkListPage {
	
	parks: Array<Park> = [];
  searchQuery: string = '';

	constructor(public navCtrl: NavController, public navParams: NavParams, public parkData: ParkData) {

		parkData.getParks().then(theResult => {
			this.parks = theResult;
		});
	}

	goParkDetails(theParkData) {
		this.navCtrl.push(ParkDetailsPage, { parkData: theParkData});
	}

	ionViewDidLoad() {
  	console.log('ionViewDidLoad ParkListPage');
	}

  // Search functionality

  getParks(event) {
    this.parkData.getParks().then(theResult => {
      this.parks = theResult;
    })

    let queryString = event.target.value;

    if(queryString !== undefined) {
      if (queryString.trim() == "") {
        return;
      }
      this.parkData.getFilteredParks(queryString).then(theResult => {
        this.parks = theResult;
      });
    }
  }

  resetList(event) {
    this.parkData.getParks().then(theResult => {
      this.parks = theResult;
    })
  }

}
