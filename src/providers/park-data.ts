import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ParkData {
	data: any = null;

	constructor(public http: Http) {}

	load() {
		if (this.data) {
			return Promise.resolve(this.data);
		}

		return new Promise(resolve => {
			this.http.get('https://parking-spots-backend.herokuapp.com/locations')
			.map(res => res.json())
			.subscribe(data => {
				this.data = data;
				resolve(this.data);
			})
		})
	}

	getParks() {
		return this.load().then(data => {
			return data;
		})
	}

	getFilteredParks(queryString) {
  	  	return this.load().then(Parks => {
    	  	let theFilteredParks: any = [];
      		for (let thePark of Parks) {
        		if(thePark.display_name.toLowerCase().indexOf(queryString.toLowerCase()) > -1) {
          			theFilteredParks.push(thePark);
        		}
      		}
      		return theFilteredParks;
    	});
  	}

} 