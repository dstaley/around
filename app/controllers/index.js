import Ember from "ember";
import DS from 'ember-data';
import pointDistance from "../utils/point-distance";

export default Ember.ArrayController.extend({
	supportsImports: function() {return 'import' in document.createElement('link');}.property()
});