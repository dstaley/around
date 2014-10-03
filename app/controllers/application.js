import Ember from 'ember';

export default Ember.Controller.extend({
	supportsImports: function() {
		return 'import' in document.createElement('link');
	},
	geoQuery: null,
	init: function() {
		// Create a Firebase reference where GeoFire will store its information
		var firebaseRef = new Firebase(GeauxHackENV.APP.firebaseURL+"/geofire-rooms");

		var controller = this;

		// Create a GeoFire index
		var geoFire = new GeoFire(firebaseRef);

		this.geoQuery = geoFire.query({
		  center: [0,0],
		  radius: 3
		});

		var controller = this;

		var onReadyRegistration = this.geoQuery.on("ready", function() {
			console.log("Center is set as: "+controller.geoQuery.center());
			console.log("GeoQuery has loaded and fired all other events for initial data");
		});

		var onKeyEnteredRegistration = this.geoQuery.on("key_entered", function(key, location, distance) {
			controller.store.find('room', key);
			console.log(key + " entered query at " + location + " (" + distance + " km from center)");
		});

		var onKeyExitedRegistration = this.geoQuery.on("key_exited", function(key, location, distance) {
			controller.store.find('room', key).then(function(room){
				room.unloadRecord();
			});
			// console.log(key + " exited query to " + location + " (" + distance + " km from center)");
		});

		Bugsnag.notifyReleaseStages = ["production"];

		if (GeauxHackENV.environment === 'development') {
			Bugsnag.releaseStage = "development";
		} else if (GeauxHackENV.environment === 'production') {
			Bugsnag.releaseStage = "production";
		}
	},
	locationChanged: function() {
		var controller = this;
		this.geolocationService.getPosition().then(function(location){
			controller.geoQuery.updateCriteria({
				center: [location.coords.latitude, location.coords.longitude]
			});
		});
	}.observes('geolocationService.location')
});
