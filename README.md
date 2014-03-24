Scrapdo
=========

Scrapdo is a scrapper for Drupal.org built with node.

Examples
--------------

* [do-api](http://github.com/arshad/do-api): An API for Drupal.org built with scrapdo and Express.
* [do-stats](http://do-stats.herokuapp.com): Statistics for Drupal.org built with do-api, scrapdo and Express.


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

The MIT License (MIT)

Copyright (c) 2014 Arshad Chummun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
