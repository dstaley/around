import Ember from 'ember';

var Router = Ember.Router.extend({
  location: GeauxHackENV.locationType
});

Router.map(function() {
  this.resource('room', { path: '/room/:id' });
  this.route('application');
  this.resource('nested', { path: '/nested'}, function(){
  	this.route('new');
  });
  this.route('new-room');
  this.route('user');
});

export default Router;
