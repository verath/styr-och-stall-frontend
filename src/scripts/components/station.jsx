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


        var mapsLink = `https://www.google.com/maps/dir/Current+Location/${station.lat},${station.long}`;

        return (
            <Paper className="station">
                <div className="mui-font-style-title">{ station.label }</div>
                <p>
                    <span className="stationInfoItem">Available Bikes: { station.freeBikes }</span>
                    <br />
                    <span className="stationInfoItem">Available Stands: { station.freeStands }</span>
                    <br />
                    <span className="stationInfoItem">
                        <i className="fa fa-map-marker"></i> <a href={mapsLink} target="_blank">Find via Maps</a>
                    </span>
                </p>
            </Paper>
        );
    }
});

module.exports = Station;
