import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ParkData } from '../../providers/park-data';
import { Park } from '../../interfaces/park';
import { ParkDetailsPage } from '../park-details/park-details';
import { CustomMapMarker } from './custom-marker';

/*
  Generated class for the ParkMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-park-map',
  templateUrl: 'park-map.html'
})
export class ParkMapPage {
	parks: Array<Park> = [];
	map: google.maps.Map;

  	constructor(public navCtrl: NavController, public navParams: NavParams, 
  		          public platform: Platform, public parkData: ParkData) {
      this.map = null;
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ParkMapPage');
    	this.initializeMap();
  	}

  	initializeMap() {

  		let minZoomLevel = 14;

  		this.map = new google.maps.Map(document.getElementById('map_canvas'), {
  			zoom: minZoomLevel,
  			center: new google.maps.LatLng(42.3736, -71.1097),
  			mapTypeControl: false,
  			streetViewControl: false,
  			mapTypeId: google.maps.MapTypeId.ROADMAP
  		});

      this.parkData.getParks().then(theResult => {

        this.parks = theResult;
        let image = 'assets/img/nps_arrowhead.png';

        for (let thePark of this.parks) {
            let parkPos:google.maps.LatLng = new google.maps.LatLng (thePark.latitude, thePark.longitude);
            let parkMarker:google.maps.Marker = new CustomMapMarker(thePark);
            parkMarker.setPosition(parkPos);
            parkMarker.setMap(this.map);
            parkMarker.setIcon(image);

            google.maps.event.addListener(parkMarker, 'click', () => {
              let selectedMarker:any = parkMarker;
              this.navCtrl.push(ParkDetailsPage, {
                parkData: selectedMarker.parkData
              });
            });
        }

      });



  	}

}
