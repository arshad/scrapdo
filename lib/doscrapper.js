/**
 * Module dependencies
 */
var request = require('request');
var user = require('./user');
var project = require('./project');

/**
 * DoScrapper
 */
var DoScrapper = module.exports = function() {
  return {
    manifest: {
      user: user,
      project: project
    },

    getData: function(type, options, callback) {
      var url = this.parametizeUrl(this.manifest[type][options.type].url, options.params);
      var extractor = this.manifest[type][options.type].extractor;

      // Make the request.
      request({
        url: url,
        headers: {
          'User-Agent': 'request'
        }
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          extractor(body, callback);
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
    getUserData: function(options, callback) {
      this.getData('user', options, callback);
    },

    // Wrapper function for getData for project.
    getProjectData: function(options, callback) {
      this.getData('project', options, callback);
    }
  }
}();