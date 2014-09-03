import Ember from 'ember';

export default Ember.Component.extend({
	map: null,
	marker: null,
	circle: null,
	zoom: 3,
	setup: function(){
		var mapOptions = {
		          center: new google.maps.LatLng(this.get('lat'), this.get('lon')),
		          zoom: this.get("zoom")
		        };
		        this.set('map', new google.maps.Map(document.getElementById("map-canvas"), mapOptions));
		        this.get('map').setZoom(this.get('zoom'));
		        var circle = {
		              strokeColor: '#2255a1',
		              strokeOpacity: 0.8,
		              strokeWeight: 2,
		              fillColor: '#2255a1',
		              fillOpacity: 0.35,
		              map: this.get('map'),
		              center: mapOptions.center,
		              radius: this.get('radius')
		            };
		            // Add the circle for this city to the map.
		            this.set('circle', new google.maps.Circle(circle));
		            this.set('marker', new google.maps.Marker({
		              position: mapOptions.center,
		              map: this.get('map')
		            }));
		            this.get('marker').setMap(this.get('map'));
		            if (this.get('radius') > 1) {
		            	this.get('map').fitBounds(this.get('circle').getBounds());
		            }
	}.on("didInsertElement"),
	latDidChange: function() {
		this.get('circle').setCenter(new google.maps.LatLng(this.get('lat'), this.get('lon')));
		this.get('map').fitBounds(this.get('circle').getBounds());
	}.observes('lat','lon'),
	radiusDidChange: function() {
		if (parseInt(this.get('radius')) != NaN) {
			this.get('circle').setRadius(parseInt(this.get('radius')));
			this.get('map').fitBounds(this.get('circle').getBounds());
		}
	}.observes('radius')
});
