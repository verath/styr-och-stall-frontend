'use strict';

// @formatter:off
var React   = require('react');
// @formatter:on


var Spinner = React.createClass({
    render() {
        return (
            <div className="spinnerContainer">
                <i className="fa fa-3x fa-refresh fa-spin"></i>
            </div>
        );
    }
});

module.exports = Spinner;
