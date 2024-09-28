'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-service-worker': {
      enabled: true,
      registrationStrategy: 'async',
    },
    'esw-asset-cache': {
      patterns: ['**/*.{js,css,png,jpg,gif,svg,woff2}'],
      version: '1',
    },
    'esw-index': {
      location: 'index.html',
    },
  });

  app.import('node_modules/bulma/css/bulma.css');

  return app.toTree();
};
