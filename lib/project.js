/**
 * Module dependencies
 */
var cheerio = require('cheerio');

var Project = module.exports = function() {
  return {
    info: {
      url: 'https://drupal.org/project/name',
      extractor: function(body, options, callback) {
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
}();
