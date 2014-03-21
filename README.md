Scapdo
=========

Scrapdo is a scrapper for Drupal.org built with node.

Installation
--------------

You can install scrapdo using npm.

    npm install scrapdo

Usage
--------------

    var scrapdo = require('scrapdo');

### User

#### Get user info

    scrapdo.getUserData('info', { uid: '571032' }, function(data) {
        console.log(data);
    });
    
Output:

    { 
        Username: 'arshadcn',
        full_name: 'Arshad Chummun',
        my_website: 'http://arshad.github.io',
        gender: 'male',
        country: '<not specified>',
        irc_nick: 'arshadcn',
        twitter_url: 'http://twitter.com/arshadcn' 
    }

    
### Get user projects

    scrapdo.getUserData('projects', { uid: '571032' }, function(data) {
        console.log(data);
    });
    
Output:

    radix: { title: 'Radix', name: 'radix' },
    restaurant: { title: 'Restaurant', name: 'restaurant' },
    andromeda: { title: 'Andromeda', name: 'andromeda' },
    andromeda_slideshow: { title: 'Andromeda Slideshow', name: 'andromeda_slideshow' },
    restaurant_theme: { title: 'Restaurant Theme', name: 'restaurant_theme' },
    restaurant_base: { title: 'Restaurant Base', name: 'restaurant_base' },
    
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
