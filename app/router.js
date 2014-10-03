import Ember from 'ember';

var Router = Ember.Router.extend({
  location: GeauxHackENV.locationType
});

Router.map(function() {
  this.resource('room', { path: '/room/:id' });
  this.route('application');
  this.route('about');
  this.route('new-room', { path: '/room/new' });
  this.route('user');
});

export default Router;
