export default {
  name: 'geolocation-service',
  initialize: function(container, app) {
    app.inject('route', 'geolocationService', 'service:geolocation');
    app.inject('controller', 'geolocationService', 'service:geolocation');
  }
};
