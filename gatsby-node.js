"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _internals = require("./internals");

var _pluginOptions = _interopRequireDefault(require("./plugin-options"));

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var publicPath = "./public";
exports.pluginOptionsSchema = _pluginOptions.default;

exports.onPostBuild = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref, pluginOptions) {
    var graphql, reporter, options, files, _iterator, _step, file, output, query, serialize, getData, data, outputPath, outputDir;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            graphql = _ref.graphql, reporter = _ref.reporter;
            options = (0, _extends2.default)({}, _internals.defaultOptions, pluginOptions);
            files = options.files;
            _iterator = _createForOfIteratorHelperLoose(files);

          case 4:
            if ((_step = _iterator()).done) {
              _context.next = 23;
              break;
            }

            file = _step.value;
            output = file.output, query = file.query, serialize = file.serialize;
            _context.next = 9;
            return (0, _internals.runQuery)(graphql, query);

          case 9:
            getData = _context.sent;
            data = serialize(getData);
            outputPath = _path.default.join(publicPath, output);
            outputDir = _path.default.dirname(outputPath);
            _context.next = 15;
            return _fsExtra.default.pathExists(outputDir);

          case 15:
            if (_context.sent) {
              _context.next = 18;
              break;
            }

            _context.next = 18;
            return _fsExtra.default.mkdirp(outputDir);

          case 18:
            _context.next = 20;
            return _fsExtra.default.writeFile(outputPath, JSON.stringify(data));

          case 20:
            reporter.success("Generated JSON file to " + output);

          case 21:
            _context.next = 4;
            break;

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();