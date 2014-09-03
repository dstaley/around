import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    login: function() {
    	var sound = new Audio('/sounds/in.mp3').play();
      this.get('firebaseAuthService').login();
    },

    logout: function() {
      this.get('firebaseAuthService').logout();
      var sound = new Audio('/sounds/out.mp3').play();
      this.transitionTo('index');
    }
  }
});