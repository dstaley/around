import Ember from "ember";
import geohash from "../utils/geohash";

export default Ember.ArrayController.extend({
	radius: 1000,
	name: '',
	actions: {
		createRoom: function(){
			// Create a Firebase reference where GeoFire will store its information
			var firebaseRef = new Firebase(GeauxHackENV.APP.firebaseURL+"/geofire-rooms");

			// Create a GeoFire index
			var geoFire = new GeoFire(firebaseRef);
			var controller = this;
			controller.store.createRecord('room', {
				name: controller.get('name'),
				l: [this.get('geolocationService.location').coords.latitude, this.get('geolocationService.location').coords.longitude],
				g: geohash([this.get('geolocationService.location').coords.latitude, this.get('geolocationService.location').coords.longitude]),
				r: this.get('radius')
			}).save().then(function(room){
				console.log(room);
				geoFire.set(room.id, room.get('l')).then(function() {
				  console.log("Provided key has been added to GeoFire");
				  controller.name = '';
				  controller.transitionToRoute('room', room, {queryParams: {newroom: true}});
				}, function(error) {
				  console.log("Error: " + error);
				});
			});
		}
	}
});