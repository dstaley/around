import Ember from "ember";

export default Ember.ArrayController.extend({
	radius: 1000,
	actions: {
		createRoom: function(){
			var name = $("#room-name").val();
			var position = {lat: this.get('geolocationService.lat'), lon: this.get('geolocationService.lon')};
			this.store.createRecord('room', { name: name, lat: position.lat, lon: position.lon, radius: this.get('radius') }).save();
		}
	}
});