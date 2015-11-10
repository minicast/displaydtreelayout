'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;
var katex = require('katex');

var DisplayDtree = React.createClass({
  displayName: 'DisplayDtree',

  render: function render() {
    return React.createElement('div', { ref: 'katex' });
  },

  componentDidMount: function componentDidMount() {
    // assumes katex css is loaded on the page:
    // <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.3.0/katex.min.css">

    this.refs.katex.innerHTML = katex.renderToString(this.props.latexString);
  }

});

module.exports = DisplayDtree;
