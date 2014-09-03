import Ember from "ember";
import pointDistance from "../utils/point-distance";

export default Ember.Route.extend({
	model: function(){
		var route = this;
		return route.get('geolocationService').getLocation().then(function(location){
			return route.store.findAll('room').then(function(){
				return route.store.filter('room', function(room){
					var room_position = {lat: room.get('lat'), lon: room.get('lon'), radius: room.get('radius')};
					var distance_from_room = pointDistance(location,[room_position.lat, room_position.lon]);
					return distance_from_room * 1000 < room_position.radius;
				});
			});
		});
	}
});