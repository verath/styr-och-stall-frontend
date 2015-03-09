# Styr Och Ställ Frontend

An application for finding available bikes and/or bike stands in Gothenburg.

## About

The application is built using [React](http://facebook.github.io/react), [Reflux](https://github.com/spoike/refluxjs),  [Material-UI](https://github.com/callemall/material-ui) and [Firebase](https://www.firebase.com/). Inspired by [react-news](https://github.com/echenley/react-news) for code stucture. The application uses a couple of features from ES6, and uses [Babel](http://babeljs.io/) for converting to ES5.

The data used is from the [open data](http://data.goteborg.se/) published by the city of Gothenburg.

### Build
Clone and `npm install`. After that;

`gulp watch` to have gulp build the app whenever a change happens.

`gulp --prod` to make gulp output an uglified version of the app js code.
