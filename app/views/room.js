import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		this.get('controller').send('scrollIntoView');
	},
	didScroll: function(){
		if ($('.message-list').height() - $('.content').scrollTop() - $('.content').height() === -44) {
			this.get('controller').set('autoScroll', true);
		} else {
			this.get('controller').set('autoScroll', false);
		}
	},
	// we check if we are at the bottom of the page
	isScrolledToBottom: function(){
	  var distanceToViewportTop = (
	    $(document).height() - $(window).height());
	  var viewPortTop = $(document).scrollTop();
	 
	  if (viewPortTop === 0) {
	    // if we are at the top of the page, don't do
	    // the infinite scroll thing
	    return false;
	  }
	 
	  return ($('.message-list').height() - $('.content').scrollTop() === 213);
	}
});
