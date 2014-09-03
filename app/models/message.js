import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  author: DS.attr('string'),
  timestamp: DS.attr('string'),
  membersWhoLike: DS.hasMany('user', { async: true }),
  likes: DS.attr('number')
});
