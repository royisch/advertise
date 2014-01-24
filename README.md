advertise
=========

what to install for grunt
=============================
grunt : npm install -g grunt-cli
grunt : npm install grunt --save-dev  - add yourself to devDependencies

steps to run
===============
npm init	
npm install grunt --save-dev
npm install grunt-contrib-uglify --save-dev
npm install grunt-contrib-cssmin --save-dev
npm install grunt-contrib-compass --save-dev


compass 
======================
compass create advertise --syntax sass


You must compile your sass stylesheets into CSS when they change.
This can be done in one of the following ways:
  1. To compile on demand:
     compass compile [path/to/project]
  2. To monitor your project for changes and automatically recompile:
     compass watch [path/to/project]

More Resources:
  * Website: http://compass-style.org/
  * Sass: http://sass-lang.com
  * Community: http://groups.google.com/group/compass-users/


To import your new stylesheets add the following lines of HTML (or equivalent) to your webpage:
<head>
  <link href="/stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
  <link href="/stylesheets/print.css" media="print" rel="stylesheet" type="text/css" />
  <!--[if IE]>
      <link href="/stylesheets/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
  <![endif]-->
</head>




watch - investigate - this should allow change a file that is watched and deployed automatically


what to install for bower
=============================
bower : npm install -g bower
bower insatll jquery#1.8.0 --save

in command line if needed proxy
================================
http.proxy=http://NAME.OF.PROXY:8080