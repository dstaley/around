import Ember from 'ember';
import pointDistance from "../utils/point-distance";

export default Ember.Route.extend({
	model: function(params) {
		var route = this;
		return route.get('geolocationService').getLocation().then(function(location){
			return route.store.find('room', params.id).then(function(room){
				var room_position = {lat: room.get('lat'), lon: room.get('lon'), radius: room.get('radius')};
				var distance_from_room = pointDistance(location,[room_position.lat, room_position.lon]);
				if (distance_from_room * 1000 > room_position.radius) {
					route.transitionToRoute('index');
				} else {
					return room;
				};
			});
		});
	}
});
