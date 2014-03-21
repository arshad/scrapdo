/**
 * Module dependencies
 */
var request = require('request');
var cheerio = require('cheerio');

/**
 * DoScrapper
 */
var DoScrapper = module.exports = function() {
  return {
    manifest: {
      user: {
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
      },
      project: {
        url: 'https://drupal.org/project/name',
        data: {
          info: {
            extractor: function(body, callback) {
              var data = {};
              $ = cheerio.load(body);

              // Get project title.
              data['title'] = $('#page-subtitle').text();

              // Get project node id.
              data['nid'] = $('#content .node').attr('id').replace(/\D+/g, '');

              // Get project author.
              var submitted = $('.submitted').find('a');
              data['author'] = {
                username: submitted.text(),
                uid: submitted.attr('href').replace(/\D+/g, '')
              }

              // Get screenshots
              data['screenshots'] = [];
              $('.field-name-field-project-images .field-item').each(function() {
                data['screenshots'].push($(this).find('img').attr('src'));
              });

              // Get maintainers.
              data['maintainers'] = [];
              $('.vc-user').each(function() {
                username = $(this).find('.username');
                data['maintainers'].push({
                  username: username.text(),
                  uid: username.attr('href').replace(/\D+/g, ''),
                  commits: $(this).find('.vc-commits').text().replace(/\D+/g, '')
                });
              });

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

    getProjectData: function(name, type, callback) {
      var url = this.manifest.project.url.replace('name', name);
      var extractor = this.manifest.project.data[type].extractor;
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
