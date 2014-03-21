/**
 * Module dependencies
 */
var request = require('request');
var user = require('./user');
var project = require('./project');

/**
 * Scrapdo
 */
var Scrapdo = module.exports = function() {
  return {
    manifest: {
      user: user,
      project: project
    },

    getData: function(module, type, options, callback) {
      var url = this.manifest[module][type].url;
      url = (typeof url === 'function') ? url() : url;
      url = this.parametizeUrl(url, options);
      var extractor = this.manifest[module][type].extractor;

      // Make the request.
      request({
        url: url,
        headers: {
          'User-Agent': 'request'
        }
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          extractor(body, options, callback);
        }
      });
    },

    /**
     * Parametize a url wth params.
     */
    parametizeUrl: function(url, params) {
      for (param in params) {
        // Escape RegEx.
        param = param.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        // Replace param.
        url = url.replace(new RegExp(param, 'g'), params[param]);
      }

      return url;
    },

    // Wrapper function for getData for user.
    getUserData: function(type, options, callback) {
      this.getData('user', type, options, callback);
    },

    // Wrapper function for getData for project.
    getProjectData: function(type, options, callback) {
      this.getData('project', type, options, callback);
    },
  }
}();
