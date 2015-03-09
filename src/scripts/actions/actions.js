'use strict';

// @formatter:off
var Reflux      = require('reflux');
var React       = require('react');
var Firebase    = require('firebase');
// @formatter:on

var baseRef = new Firebase('https://styr-och-stall.firebaseio.com/');
var stationsRef = baseRef.child('stations');


var actions = Reflux.createActions({
});


module.exports = actions;
