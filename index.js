var request = require('request');
var cheerio = require('cheerio');

var DoScrapper = module.exports = function() {
  return {
    manifest: {
      'user': {
        url: 'https://drupal.org/user/uid',
        data: {
          info: {
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
            extractor: function(body, callback) {
              var data = {}
              $ = cheerio.load(body);

              $('.main dl .item-list ul li').each(function() {
                var link = $(this).find('a');
                if (link.length) {
                  project = DoScrapper.getProjectInfoFromLink(link);
                  data[project.name] = project;
                }
              });

              callback(data);
            }
          },
          commitCount: {
            extractor: function(body, callback) {
              $ = cheerio.load(body);
              data = $('.profile .item-list li.last').html().replace(/\D+/g, '');
              callback(data);
            }
          }
        }
      }
    },

    getData: function(url, extractor, callback) {
      var options = {
          url: url,
          headers: {
              'User-Agent': 'request'
          }
      };

      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          extractor(body, callback);
        }
      });
    },

    getUserData: function(uid, type, callback) {
      var url = this.manifest.user.url.replace('uid', uid);
      var extractor = this.manifest.user.data[type].extractor;
      this.getData(url, extractor, callback);
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

