import Ember from "ember";
import pointDistance from "../utils/point-distance";

export default Ember.Route.extend({
	model: function() {
		var route = this;
		return this.store.filter('room', function(room){
			if (room.get('isLoaded')) {
				var location = route.geolocationService.location.coords;
				var roomLocation = [room.get('l')[0], room.get('l')[1]];
				var distanceFromRoom = pointDistance([location.latitude, location.longitude], roomLocation) * 1000;
				return room.get('isLoaded') && distanceFromRoom < room.get('r');
			} else {
				return false;
			}
		});
	}.observes('geolocationService.location'),
	actions: {
		didTransition: function() {$(document).attr('title', 'around');}
	}
});
