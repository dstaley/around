import Ember from 'ember';

export default Ember.Object.extend({
	hasLocation: false,
	location: null,
	options: { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 },
	init: function() {
		this.getPosition();
	},
	getPosition: function() {
		var service = this;
		return new Ember.RSVP.Promise(function(resolve, reject){
			if (service.get('supportsGeolocation')) {
				if (service.get('hasLocation')) {
					resolve(service.get('location'));
				} else {
					navigator.geolocation.watchPosition(function(position) {
						service.set('location', position);
						service.set('hasLocation', true);
						resolve(position);
					}, function(error) {
						Bugsnag.notifyException(error, "GeolocationServiceError");
						reject(error);
					}, service.options);
				}
			} else {
				reject(new Error("Browser does not support geolocation."));
			}
		});
	},
	supportsGeolocation: function() {
		return 'geolocation' in window.navigator;
	}
});
