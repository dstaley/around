import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['src'],
  src: function(){
    var id = this.get('gravatarId'), size = this.get('size');
    return 'https://gravatar.com/avatar/%@?s=%@&d=retro'.fmt(id, size);
  }.property('gravatarId')
});
