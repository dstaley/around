import Ember from 'ember';

export default Ember.Object.extend({
	lat: null,
	lon: null,
	options: { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 },

	init: function() {
		var service = this;
		navigator.geolocation.getCurrentPosition(function(position){
			service.set('lat', position.coords.latitude);
			service.set('lon', position.coords.longitude);
		}, function(){
			console.log("location error");
		}, this.options);
		Ember.run.later(this, function(){
			this.updateLocation();
		});
	},
	getLocation: function() {
		var service = this;
		return new Ember.RSVP.Promise(function(resolve, reject){
			if (service.get('lat') !== null) {
				resolve([service.get('lat'), service.get('lon')]);
			} else {
				navigator.geolocation.getCurrentPosition(function(position){
					service.set('lat', position.coords.latitude);
					service.set('lon', position.coords.longitude);
					resolve([position.coords.latitude,position.coords.longitude]);
				}, function(){
					reject();
				}, service.options);
			}
		});
	},
	updateLocation: function() {
		Ember.run.later(this, function(){
			var service = this;
			navigator.geolocation.getCurrentPosition(function(position){
				service.set('lat', position.coords.latitude);
				service.set('lon', position.coords.longitude);
				service.updateLocation();
			}, function(){
				console.log("location error");
			}, this.options);
		}, 30000);
	}
});
