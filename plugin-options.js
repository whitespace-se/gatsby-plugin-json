"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));

var _graphql = require("gatsby/graphql");

var _commonTags = require("common-tags");

var _templateObject;

var _default = function _default(_ref) {
  var Joi = _ref.Joi;
  return Joi.object({
    query: Joi.string(),
    serialize: Joi.func()
  }).unknown(true).external(function (_ref2) {
    var query = _ref2.query;

    if (query) {
      try {
        (0, _graphql.parse)(query);
      } catch (e) {
        throw new Error((0, _commonTags.stripIndent)(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["\n        Invalid plugin options for \"gatsby-plugin-json\":\n        \"query\" must be a valid GraphQL query. Received the error \"", "\""])), e.message));
      }
    }
  });
};

exports.default = _default;