'use strict';

// @formatter:off
var Reflux      = require('reflux');
var React       = require('react');
var Firebase    = require('firebase');
// @formatter:on

var stationsRef = new Firebase('https://styr-och-stall.firebaseio.com/stations');

var stationsStore = Reflux.createStore({
    init() {
        stationsRef.on('value', this.updateStations.bind(this));
    },

    updateStations(stationsSnapshot) {
        let stations = [];
        stationsSnapshot.forEach((stationData) => {
            let station = stationData.val();
            station.id = stationData.key();
            stations.push(station);
        });

        this.trigger({
            stations: stations
        });
    }
});

module.exports = stationsStore;
