'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

require('./SVGViewer.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } 


require('es6-promise').polyfill();
require('isomorphic-fetch');

var SVGViewer = function (_React$Component) {
  _inherits(SVGViewer, _React$Component);

  function SVGViewer(props) {
    _classCallCheck(this, SVGViewer);

    var _this = _possibleConstructorReturn(this, (SVGViewer.__proto__ || Object.getPrototypeOf(SVGViewer)).call(this, props));

    _this.state = {
      svg: null,
      zoomLevel: 0,
      zoomOrigin: null,
      dragOffset: null,
      dragPosition: { x: 0, y: 0 },
      isDragEnabled: false
    };
    return _this;
  }

  _createClass(SVGViewer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.loadFile = this.loadFile.bind(this);
      this.parseSVG = this.parseSVG.bind(this);
      this.mouseWheelHandler = this.mouseWheelHandler.bind(this);
      this.setZoomOrigin = this.setZoomOrigin.bind(this);
      this.unsetZoomOrigin = this.unsetZoomOrigin.bind(this);
      this.startDrag = this.startDrag.bind(this);
      this.stopDrag = this.stopDrag.bind(this);
      this.doDrag = this.doDrag.bind(this);

      this.zoom = (0, _lodash.debounce)(this.zoom.bind(this), 50, { leading: true, trailing: false });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      return this.props.file.indexOf('http') === 0 ? this.loadFile() : this.parseSVG(this.props.svgString);
    }
  }, {
    key: 'loadFile',
    value: function loadFile() {
      var _this2 = this;

      fetch(this.props.file).then(function (res) {
        if (res.status >= 400) {
          throw new Error('Bad response from server while loading ' + _this2.props.file);
        }
        return res.text();
      }).then(function (svg) {
        _this2.setState({ svg: _this2.parseSVG(svg) });
      }).catch(function (err) {
        throw new Error('Unknown error occured while loading ' + _this2.props.file + ' -> ' + err.message);
      });
    }
  }, {
    key: 'parseSVG',
    value: function parseSVG() {
      var xmlString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      return new DOMParser().parseFromString(xmlString, 'text/xml');
    }
  }, {
    key: 'mouseWheelHandler',
    value: function mouseWheelHandler(e) {
      e.preventDefault();
      var amount = e.deltaY;
      this.zoom(amount);
    }
  }, {
    key: 'zoom',
    value: function zoom(amount) {
      if (amount !== 0 && amount !== -0) {
        this.setState({ zoomLevel: this.state.zoomLevel + amount });
      }
    }
  }, {
    key: 'setZoomOrigin',
    value: function setZoomOrigin(e) {
      this.setState({ zoomOrigin: { x: e.clientX, y: e.clientY } });
    }
  }, {
    key: 'unsetZoomOrigin',
    value: function unsetZoomOrigin() {
      this.setState({ zoomOrigin: null });
    }
  }, {
    key: 'limitZoomLevel',
    value: function limitZoomLevel(level) {
      if (level >= 0) {
        return level < this.props.maxZoomLevel ? level : this.props.maxZoomLevel;
      }

      if (level <= -0) {
        return level > this.props.minZoomLevel ? level : this.props.minZoomLevel;
      }

      return level;
    }
  }, {
    key: 'startDrag',
    value: function startDrag(e) {
      var bounds = e.currentTarget.getBoundingClientRect();

      this.setState({
        isDragEnabled: true,
        dragOffset: {
          x: e.clientX - bounds.left,
          y: e.clientY - bounds.top
        }
      });
      e.currentTarget.addEventListener('mousemove', this.doDrag);
    }
  }, {
    key: 'stopDrag',
    value: function stopDrag(e) {
      this.setState({ isDragEnabled: false });
      e.currentTarget.removeEventListener('mousemove', this.doDrag);
    }
  }, {
    key: 'doDrag',
    value: function doDrag(e) {
      if (!this.state.isDragEnabled) return;

      this.setState({
        dragPosition: {
          x: e.clientX - this.state.dragOffset.x,
          y: e.clientY - this.state.dragOffset.y
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var svgContainerStyles = {
        transform: 'translateX(' + this.state.dragPosition.x + 'px)\n                  translateY(' + this.state.dragPosition.y + 'px)\n                  translateZ(' + this.limitZoomLevel(this.state.zoomLevel * 500) + 'px)'
      };

      if (this.state.zoomOrigin) {
        svgContainerStyles.transformOrigin = this.state.zoomOrigin.x + 'px ' + this.state.zoomOrigin.y + 'px';
      }

      return _react2.default.createElement(
        'div',
        { className: 'svg-container',
          ref: function ref(_ref) {
            return _this3.svgContainer = _ref;
          } },
        this.state.svg ? _react2.default.createElement('div', { className: this.props.allowUserViewChange ? 'grabbable' : '',
          onWheel: this.mouseWheelHandler,
          onMouseDown: this.startDrag,
          onMouseUp: this.stopDrag,
          style: svgContainerStyles,
          dangerouslySetInnerHTML: {
            __html: new XMLSerializer().serializeToString(this.state.svg.documentElement) } }) : _react2.default.createElement(
          'div',
          null,
          'Loading...'
        )
      );
    }
  }]);

  return SVGViewer;
}(_react2.default.Component);

SVGViewer.defaultProps = {
  allowUserViewChange: true,
  maxZoomLevel: 2000,
  minZoomLevel: -2000
};

SVGViewer.proptypes = {
  maxZoomLevel: _react.PropTypes.number,
  minZoomLevel: _react.PropTypes.number,
  allowUserViewChange: _react.PropTypes.bool,
  svgString: _react.PropTypes.string,
  file: _react.PropTypes.string
};

exports.default = SVGViewer;