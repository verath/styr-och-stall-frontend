'use strict';

require("babelify/polyfill");

// @formatter:off
var Reflux          = require('reflux');
var React           = require('react/addons');
var tapEventPlugin  = require("react-tap-event-plugin");
var mui             = require('material-ui');

var locationStore   = require('./stores/locationStore');
var stationsStore   = require('./stores/stationsStore');
var Station         = require('./components/station');

var AppCanvas               = mui.AppCanvas;
var AppBar                  = mui.AppBar;
var DropDownMenu            = mui.DropDownMenu;
var TextField               = mui.TextField;
var Checkbox                = mui.Checkbox;
var Paper                   = mui.Paper;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

// @formatter:on

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo: https://github.com/zilverline/react-tap-event-plugin
tapEventPlugin();


var NUM_STATIONS = 15;


var StyrOchStall = React.createClass({

    mixins: [Reflux.ListenerMixin],

    getInitialState() {
        return {
            loading: true,
            stations: [],
            filterBy: new Set(),
            searchBy: '',
            location: null
        };
    },

    componentDidMount() {
        this.listenTo(stationsStore, this.onStationsChange);
        this.listenTo(locationStore, this.onLocationChange)
    },

    onStationsChange(stationsData) {
        this.setState({
            loading: false,
            stations: stationsData.stations
        });
    },

    onLocationChange(locationData) {
        this.setState({
            location: locationData.location
        });
    },

    _onStationFilterChange(event) {
        var filterName = event.target.value;
        var enabled = event.target.checked;
        var filterBy = this.state.filterBy;

        if (enabled) {
            filterBy.add(filterName);
        } else {
            filterBy.delete(filterName);
        }
        this.setState({
            filterBy: filterBy
        });
    },

    _onStationSearchChange(event) {
        var searchString = event.target.value.toLocaleUpperCase();
        this.setState({
            searchBy: searchString
        });
    },

    render() {
        var stations = this.state.stations;
        var filterBy = this.state.filterBy;
        var searchBy = this.state.searchBy;
        var location = this.state.location;

        // Filter by selected filters
        stations = stations.filter((station) => {
            for(let filter of filterBy) {
                if (station[filter] <= 0) {
                    return false;
                }
            }
            return true;
        });

        // Free text search
        stations = stations.filter((station) => station.label.indexOf(searchBy) > -1);

        // Only include open stations
        stations = stations.filter((station) => station.state == "open");

        // Sort by location, if available
        if (location) {
            const lat = location.lat;
            const long = location.long;
            stations.forEach((station) =>
                station.locationDiff = Math.sqrt(Math.pow(station.lat - lat, 2) + Math.pow(station.long - long, 2))
            );
            stations.sort((a, b) => a['locationDiff'] - b['locationDiff']);
        }

        // Limit to NUM_STATIONS
        stations = stations.slice(0, NUM_STATIONS);

        stations = stations.map((station) =>
            (<Station station={ station } key={ station.id } />)
        );

        return (
            <AppCanvas>
                <AppBar title="Styr och Ställ" showMenuIconButton={false} zDepth={0}></AppBar>

                <main className="mainContainer">

                    <TextField
                        className="stationsFilter"
                        hintText="Station Name"
                        floatingLabelText="Filter by Name"
                        onChange={this._onStationSearchChange}/>

                    <Checkbox
                        name="excludeNoBikesFilter"
                        value="freeBikes"
                        label="Exclude stations with no bikes"
                        onCheck={this._onStationFilterChange}/>
                    <Checkbox
                        name="excludeNoStationsFilter"
                        value="freeStations"
                        label="Exclude stations with no stands"
                        onCheck={this._onStationFilterChange}/>

                    <div className="stationList">
                        <ReactCSSTransitionGroup transitionName="stationItemAnimation">
                            { this.state.loading
                                ? <div key="stationListLoading" className="stationListLoading"><i className="fa fa-3x fa-refresh fa-spin"></i></div>
                                : stations}
                        </ReactCSSTransitionGroup>
                    </div>
                </main>
            </AppCanvas>
        )
    }

});

React.render(<StyrOchStall />, document.body);