'use strict';


// @formatter:off
const React   = require('react');
const mui     = require('material-ui');

const Paper       = mui.Paper;
const FlatButton  = mui.FlatButton;
const FontIcon    = mui.FontIcon;
// @formatter:on


var Station = React.createClass({
    render() {
        let station = this.props.station;

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
                        <i className="fa fa-map-marker"></i>
                        &nbsp;
                        <a href={mapsLink} target="_blank">Find via Maps</a>
                    </span>
                </p>
            </Paper>
        );
    }
});

module.exports = Station;
