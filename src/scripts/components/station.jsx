'use strict';


// @formatter:off
var React   = require('react');
var mui     = require('material-ui');

var Paper       = mui.Paper;
var FlatButton  = mui.FlatButton;
var FontIcon    = mui.FontIcon;
// @formatter:on


var Station = React.createClass({
    render() {
        var station = this.props.station;

        // Create a better breaking point for small screens
        station.label = station.label.replace('/', ' / ');

        var mapsLink = `https://maps.google.com/?q=${station.lat},${station.long}`;

        return (
            <Paper className="station">
                <h2>{ station.label }</h2>
                <div className="stationInfo">
                    <span className="stationInfoItem">Bikes: { station.freeBikes }</span>
                    <span className="stationInfoItem">Stands: { station.freeStands }</span>
                    <span className="stationInfoItem">
                        <i className="fa fa-map-marker"></i> <a href={mapsLink} target="_blank">Open in Maps</a>
                    </span>
                </div>
            </Paper>
        );
    }
});

module.exports = Station;
