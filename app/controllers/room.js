import Ember from 'ember';
import pointDistance from "../utils/point-distance";

export default Ember.Controller.extend({
	queryParams: ['newroom'],
	newroom: false,
	onNewroomChanged: function() {
		if (this.get('newroom')) {
			var sound = new Audio('/sounds/new.mp3').play();
			// This doesn't work for some odd reason
			// this.set('newroom', false);
		}
	}.observes('newroom'),
	text: '',
	autoScroll: true,
	location: function() {
		var controller = this;
		controller.geolocationService.getPosition().then(function(location){
			var room_position = {lat: controller.get('content.l')[0], lon: controller.get('content.l')[1], radius: controller.get('content.r')};
			var distance_from_room = pointDistance([location.coords.latitude, location.coords.longitude],[room_position.lat, room_position.lon]);
			if (distance_from_room * 1000 > room_position.radius) {
				controller.transitionToRoute('index');
			}
		});
	}.observes("geolocationService.location", "content.radius"),
	onNewMessage: function(){
		if (this.get('autoScroll')) {
			Ember.run.debounce({name:"debounce"}, this.scrollIntoView, 500);
		}
	}.observes("model.messages.@each"),
	scrollIntoView: function() {
		$('.content').animate({scrollTop: $('.message-list').height()}, 200);
	},
	updateTitle: function() {
	    $(document).attr('title', this.get('content.name'))
	}.observes('content.name'),
	actions: {
		sendMessage: function(){
			var controller = this;
			var msg = this.get('text');
			var room = this.model;
			var store = this.store;
			var user = this.get('firebaseAuthService.currentUser');
			var message = store.createRecord('message', { text: msg, timestamp: Firebase.ServerValue.TIMESTAMP, author: user.get('md5') });
			room.get('messages').addObject(message);
			room.save().then(function(){
				var sound = new Audio('/sounds/send.mp3').play();
				controller.set('text', '');
			});
		},
		scrollIntoView: function() {
			this.scrollIntoView();
		}
	}
});
