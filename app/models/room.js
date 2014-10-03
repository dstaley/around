import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  l: DS.attr('raw'),
  g: DS.attr('string'),
  r: DS.attr('number'),
  messages: DS.hasMany('message', { embedded: true })
});
