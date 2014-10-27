//requires
'use strict';

var ViewSwitcher = require('ampersand-view-switcher');
var MapNodeCollection = require('./ampersand/map-node-collection');
var UserState = require('./ampersand/user-state');
var EntryView = require('./ampersand/entry-view');
var ResultView = require('./ampersand/result-view');
var Router = require('./ampersand/router');
var controller = require('./ampersand/app-controller');
var menu = require('./vendor/menu');

//The query that gets used with nominatim, for a full list:
// http://wiki.openstreetmap.org/wiki/Nominatim/Special_Phrases

menu.initialize();

module.exports = {

  blastoff: function() {
    window.app = this;
    app.query = 'Spielplatz';

    app.user = new UserState();
    app.mapNodes = new MapNodeCollection();

    //instantiate the neccessary views
    app.entryView = new EntryView();
    app.resultView = new ResultView({collection: app.mapNodes});

    console.log(controller);

    app.controller = controller;

    app.pageSwitcher = new ViewSwitcher(document.querySelector('main'), {
      show: function(newView, oldView) {
        // it's inserted and rendered for me
        document.title = newView.pageTitle || app.query + 'finder';
        document.body.scrollTop = 0;
      }
    });

    controller.initialize();

    app.router = new Router();
    app.router.history.start({pushState: false});
    console.log('Blastoff!');
  },
};

module.exports.blastoff();
