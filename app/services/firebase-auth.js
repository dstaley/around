import Ember from 'ember';

export default Ember.Object.extend({
	authed: false,
	waitingForUser: true,
	currentUser: null,

	init: function() {
		var store = this.store;
		var ref = store.adapterFor('application').get('firebase');
		var service = this;
		this.authClient = new FirebaseSimpleLogin(ref, function(error, firebase_user){
			if (firebase_user !== null) {
				store.find('user', firebase_user.uid).then(function(user){
					service.set('currentUser', user);
					service.set('waitingForUser', false);
					service.set('authed', true);
				}, function(){
					delete store.typeMapFor(store.modelFor('user')).idToRecord[firebase_user.uid];
					var user = store.createRecord('user', {
						id: firebase_user.uid,
						md5: md5(firebase_user.uid)
					}).save().then(function(user){
						service.set('currentUser', user);
						service.set('waitingForUser', false);
						service.set('authed', true);
					});
				});
			} else {
				this.set('waitingForUser', false);
				this.set('authed', false);
			}
		}.bind(this));
	},
	login: function() {
		this.authClient.login('anonymous');
	},
	logout: function() {
		this.authClient.logout();
	}
});
