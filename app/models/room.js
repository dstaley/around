import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  lat: DS.attr('number'),
  lon: DS.attr('number'),
  radius: DS.attr('number'),
  messages: DS.hasMany('message', { embedded: true })
});
