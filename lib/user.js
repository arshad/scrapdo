/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var tableize = require('tableize');

var User = module.exports = function() {
  return {
    info: {
      url: 'https://drupal.org/user/uid',
      extractor: function(body, options, callback) {
        var data = {}
        $ = cheerio.load(body);

        // Get the username.
        data['username'] = $('#page-title').html();

        $('.main h3').each(function() {
          var dl = $(this).next();
          switch ($(this).text()) {
            case 'Personal information':
            case 'History':
              dl.find('dt').each(function() {
                data[$(this).text().toLowerCase()] = $(this).next('dd').text();
              });
              break;
          }
        });

        callback(tableize(data));
      }
    },

    projects: {
      url: 'https://drupal.org/user/uid',
      extractor: function(body, options, callback) {
        var data = []
        $ = cheerio.load(body);

        $('.main dl .item-list ul li').each(function() {
          var link = $(this).find('a');
          if (link.length) {
            project = User.getProjectInfoFromLink(link);

            // Add commit count.
            project.commits = $(this).text().match(/\(([0-9]*) commit[s]?\)/m)[1];

            data.push(project);
          }
        });

        callback(data);
      }
    },

    commitsCount: {
      url: 'https://drupal.org/user/uid',
      extractor: function(body, options, callback) {
        $ = cheerio.load(body);
        var count = 0;

        // Get count from body.
        if ($('.profile .item-list li.last').length) {
          count = $('.profile .item-list li.last').html().replace(/\D+/g, '');
        }

        callback({ count: count });
      }
    },

    commits: {
      url: 'https://drupal.org/user/uid/track/code?page=pagenumber',
      extractor: function(body, options, callback) {
        var data = [];
        $ = cheerio.load(body);
        $('.view-vc-git-project-user-commits .views-row').each(function() {
          var commit = {};

          // Add commit info.
          commit.project = User.getProjectInfoFromLink($(this).find('.commit-global h3 a').first()),
          commit.date = $(this).find('.commit-global h3 a').last().text(),
          commit.hash = $(this).find('.commit-info a').text(),
          commit.branch = $(this).find('.commit-info strong').last().text(),
          commit.message = $(this).find('.views-field-message .field-content').text()

          data.push(commit);
        });

        callback(data);
      }
    },

    uid: {
      url: 'https://drupal.org/search/user/username',
      extractor: function(body, options, callback) {
        $ = cheerio.load(body);
        var data = 0;

        if ($('.user-results .search-result').length) {
          // Loop and find matching username.
          $('.user-results .search-result').each(function() {
            var anchor = $(this).find('.title a');
            if (options.username == anchor.text().trim()) {
              data = anchor.attr('href').match(/([0-9]*)$/m)[1];
              callback(data);
            }
          });
        } else {
          callback(data);
        }

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
