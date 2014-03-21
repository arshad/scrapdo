/**
 * Module dependencies
 */
var cheerio = require('cheerio');

var User = module.exports = function() {
  return {
    info: {
      url: 'https://drupal.org/user/uid',
      extractor: function(body, callback) {
        var data = {}
        $ = cheerio.load(body);

        // Get the username.
        data['Username'] = $('#page-title').html();

        $('.main h3').each(function() {
          var dl = $(this).next();
          switch ($(this).text()) {
            case 'Personal information':
              dl.find('dt').each(function() {
                data[$(this).text()] = $(this).next('dd').text();
              });
              break;
          }
        });

        callback(data);
      }
    },
    projects: {
      url: 'https://drupal.org/user/uid',
      extractor: function(body, callback) {
        var data = {}
        $ = cheerio.load(body);

        $('.main dl .item-list ul li').each(function() {
          var link = $(this).find('a');
          if (link.length) {
            project = User.getProjectInfoFromLink(link);
            data[project.name] = project;
          }
        });

        callback(data);
      }
    },
    commitCount: {
      url: 'https://drupal.org/user/uid',
      extractor: function(body, callback) {
        $ = cheerio.load(body);
        data = $('.profile .item-list li.last').html().replace(/\D+/g, '');
        callback(data);
      }
    },

    // Helper function to extract project information from anchor html.
    // Example: <a href="/project/radix">Radix</a>.
    getProjectInfoFromLink: function(link) {
      var project = {};

      // Extract project title and project name.
      project.title = link.text();
      project.name = link.attr('href').match(/^\/[\S]*\/([\S]*)$/m)[1];

      return project;
    }
  }
}();
