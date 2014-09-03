export default {
  name: 'firebase-auth-service',
  initialize: function(container, app) {
  	app.inject('service:firebase-auth', 'store', 'store:main');
    app.inject('route', 'firebaseAuthService', 'service:firebase-auth');
    app.inject('controller', 'firebaseAuthService', 'service:firebase-auth');
  }
};
