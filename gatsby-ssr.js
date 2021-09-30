"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _gatsby = require("gatsby");

var _internals = require("./internals");

var withPrefix = _gatsby.withAssetPrefix || _gatsby.withPrefix;

exports.onRenderBody = function (_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents,
      pathname = _ref.pathname;

  var _defaultOptions$plugi = (0, _extends2.default)({}, _internals.defaultOptions, pluginOptions),
      files = _defaultOptions$plugi.files;

  var links = files.filter(function (_ref2) {
    var match = _ref2.match;
    if (typeof match === "string") return new RegExp(match).exec(pathname);
    return true;
  }).map(function (_ref3, i) {
    var output = _ref3.output,
        link = _ref3.link;
    var href = link || withPrefix(output.replace(/^\/?/, "/"));
    return /*#__PURE__*/_react.default.createElement("link", {
      key: "gatsby-plugin-json-" + i,
      rel: "alternate",
      type: "application/json",
      title: "gatsby-plugin-json-" + i,
      href: href
    });
  });
  setHeadComponents(links);
};