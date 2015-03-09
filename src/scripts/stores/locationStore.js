'use strict';

// @formatter:off
var Reflux      = require('reflux');
var React       = require('react');
// @formatter:on


var locationStore = Reflux.createStore({
    init: function () {
        this.location = null;

        if ("geolocation" in navigator) {
            this.watchId = navigator.geolocation.watchPosition(this.updateLocation.bind(this));
        }
    },

    updateLocation: function (position) {
        var coords = position.coords;
        this.location = {
            lat: coords.latitude,
            long: coords.longitude
        };

        this.trigger({
            location: this.location
        });
    }
});

module.exports = locationStore;
