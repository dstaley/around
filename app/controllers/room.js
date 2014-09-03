import Ember from 'ember';
import pointDistance from "../utils/point-distance";

export default Ember.Controller.extend({
	text: '',
	autoScroll: true,
	location: function() {
		var controller = this;
		this.get("geolocationService").getLocation().then(function(location){
			var room_position = {lat: controller.get('content.lat'), lon: controller.get('content.lon'), radius: controller.get('content.radius')};
			var distance_from_room = pointDistance(location,[room_position.lat, room_position.lon]);
			if (distance_from_room * 1000 > room_position.radius) {
				controller.transitionToRoute('index');
			}
		});
	}.observes("geolocationService.lat", "content.radius"),
	ghghg: function(){
		if (this.get('autoScroll')) {
			Ember.run.debounce({name:"debounce"}, this.scrollIntoView, 500);
		}
	}.observes("model.messages.@each"),
	scrollIntoView: function() {
		$('.content').animate({scrollTop: $('.message-list').height()}, 200);
	},
	actions: {
		sendMessage: function(){
			var controller = this;
			var msg = this.get('text');
			var room = this.model;
			var store = this.store;
			var user = this.get('firebaseAuthService.currentUser');
			// room.get('messages').then(function(messages){
			// 	store.createRecord('message', { text: msg, timestamp: new Date().getTime(), likes: 0, author: user.get('md5') }).save().then(function(message){
			// 		messages.pushObject(message);
			// 		room.save().then(function(){
			// 			controller.set('text', '');
			// 		});
			// 	});
			// });
			// store.createRecord('message', { text: msg, timestamp: new Date().getTime(), likes: 0, author: user.get('md5') }).save().then(function(message){
			// 	room.get('messages').addObject(message);
			// 	room.save().then(function(){
			// 		controller.set('text', '');
			// 	});
			// });
			var message = store.createRecord('message', { text: msg, timestamp: new Date().getTime(), likes: 0, author: user.get('md5') });
			room.get('messages').addObject(message);
			room.save().then(function(){
				var sound = new Audio('/sounds/send.mp3').play();
				controller.set('text', '');
			});
		},
		scrollIntoView: function() {
			console.log("Triggering a scroll into view");
			$('.content').animate({scrollTop: $('.message-list').height()}, 'slow');
		}
	}
});
