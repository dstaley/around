import Ember from "ember";

export default Ember.ArrayController.extend({
	radius: 1000,
	name: '',
	actions: {
		createRoom: function(){
			var controller = this;
			var name = this.get('name');
			var position = {lat: this.get('geolocationService.lat'), lon: this.get('geolocationService.lon')};
			this.store.createRecord('room', { name: name, lat: position.lat, lon: position.lon, radius: this.get('radius') }).save().then(function(room){
				controller.transitionTo('room', room.id);
			});
		}
	}
});