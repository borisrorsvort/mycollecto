/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'mycollecto',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    'place-autocomplete': {
      key: 'AIzaSyBOmERV2C7zNuCtm4pSSoMfkGE8Rf-3wNM'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    apiUrl: 'https://api-mycollecto.rhcloud.com',
    streetView: {
      apiKey: 'AIzaSyBOmERV2C7zNuCtm4pSSoMfkGE8Rf-3wNM'
    },
    mixpanel: {
      enabled: true,
      token: '0ffa62b5332c499e9e927d90f0a95d0a'
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval' *.googleapis.com",
      'font-src': "'self' fonts.gstatic.com",
      'img-src': "'self' *.googleapis.com maps.gstatic.com *.gstatic.com",
      'style-src': "'self' 'unsafe-inline' *.googleapis.com",
      'connect-src': "'self' api.mixpanel.com"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    // ENV.APP.LOG_BINDINGS = true;
    ENV.mixpanel = {
      enabled: true,
      LOG_EVENT_TRACKING: true,
      token: '0036ce7dcdd5b63a37a1d2d56a6fd453'
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.baseURL = '/mycollecto/';
  }

  return ENV;
};
