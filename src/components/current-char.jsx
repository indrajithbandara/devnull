/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    getUrl = require('../lib/get-url.js'),
    jsonMarkup = require('json-markup'),
    Constants = require('../constants.js');

var CurrentChar = React.createClass({
  getInitialState: function() {
    return {currentChar: {}};
  },

  render: function() {
    var rawMarkup = jsonMarkup(this.state.currentChar);
    return <div>
      <h1>Current Character</h1>
      <span dangerouslySetInnerHTML={{__html: rawMarkup}} />;
    </div>;
  },

  componentWillReceiveProps: function() {
    this._getChar();
  },

  componentDidMount: function() {
    setInterval(this._getChar, Constants.CURRENT_CHAR_INTERVAL);
  },

  _getChar: function() {
    if (this.props.currentChar) {
      $.get(getUrl('getcharacter', this.props.currentChar), function(response){
        delete response.mid;
        this.setState({currentChar: response});
      }.bind(this));
    }
  }
});

module.exports = CurrentChar;
