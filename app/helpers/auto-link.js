import Ember from 'ember';

function autoLink(value) {
	var escaped = Handlebars.Utils.escapeExpression(value);
	return new Ember.Handlebars.SafeString(window.Autolinker.link(escaped));;
}

export { autoLink };

export default Ember.Handlebars.makeBoundHelper(autoLink);
