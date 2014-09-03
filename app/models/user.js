import DS from 'ember-data';

export default DS.Model.extend({
  md5: DS.attr('string'),
  uid: DS.attr('string')
});
