import Ember from 'ember';
import pointDistance from "../utils/point-distance";

export default Ember.Route.extend({
	model: function(p) {
		return this.store.find('room', p.id);
	}
});
