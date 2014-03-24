Scapdo
=========

Scrapdo is a scrapper for Drupal.org built with node.

Examples
--------------

[do-api](http://github.com/arshad/do-api): An API for Drupal.org built with scrapdo and Express.
[do-stats](http://do-stats.herokuapp.com): Statistics for Drupal.org built with do-api, scrapdo and Express.


Installation
--------------

You can install scrapdo using npm.

    npm install scrapdo

Usage
--------------

    var scrapdo = require('scrapdo');

### User

#### Get user info

    scrapdo.getUserData('info', { username: 'arshadcn' }, function(data) {
        console.log(data);
    });
    
Output:

    { 
        username: 'arshadcn',
        full_name: 'Arshad Chummun',
        my_website: 'http://arshad.github.io',
        gender: 'male',
        country: '<not specified>',
        irc_nick: 'arshadcn',
        twitter_url: 'http://twitter.com/arshadcn' 
    }

    
### Get user projects

    scrapdo.getUserData('projects', { username: 'arshadcn' }, function(data) {
        console.log(data);
    });
    
Output:

    [
      {
        title: "Radix",
        name: "radix",
        commits: "275"
      },
      {
        title: "Restaurant",
        name: "restaurant",
        commits: "205"
      },
      {
        title: "Andromeda",
        name: "andromeda",
        commits: "64"
      },
      {
        title: "Andromeda Slideshow",
        name: "andromeda_slideshow",
        commits: "47"
      },
      {
        title: "Restaurant Base",
        name: "restaurant_base",
        commits: "44"
      }
    ]

### Project

### Get project info

    scrapdo.getProjectData('info', { name: 'views' }, function(data) {
      console.log(data);
    });
    
Output:

    {
        title: 'Views',
        nid: '38878',
        author: { username: 'merlinofchaos', uid: '26979' },
        screenshots: [],
        maintainers:
            [ 
                { username: 'tim.plunkett', uid: '241634', commits: '580' },
                { username: 'dawehner', uid: '99340', commits: '2916' },
                { username : 'damiankloip', uid: '1037976', commits: '353' },
                { username: 'dww', uid: '46549', commits: '28' },
                { username: 'xjm', uid: '65776', commits: '78' } 
            ] 
    }

License
----

MIT
