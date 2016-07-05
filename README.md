# Add MLB.TV Game Link On Yahoo! Fantasy Baseball Page
Provide a link to MLB.TV live stream of baseball games when viewing roster on Yahoo! Fantasy Baseball. The link will show up on in-progress games when viewing fantasy rosters. A subscription to MLB.TV is required to stream the game. 

Why
==============
Too often I'm looking at my fantasy baseball team on Yahoo! only to see that a few of my players are playing. Instead of opening up a new tab, navigating to mlb.tv, finding the game and launching the live stream (yes, you need an MLB.TV premium account to watch), it'd save precious seconds if the links were already on the fantasy roster page.

This simple Firefox add-on provides the link on page: http://addons.mozilla.org/en-US/firefox/addon/mlb-tv-4-yahoo-fantasy-bball/

Good improvements are to be had, e.g., find game id and map to the mlb.tv game (using something like https://gd2.mlb.com/components/game/mlb/year_2016) but this suffices for me so far as all links to games are avavailable.


Build
==============
To make an .xpi package, you must have nodejs/npm/jpm installed on your system. You may read docs for doing so online.

If you have it installed, to make the xpi, simply run:

    make

If you want to launch firefox to debug your changes:

    make degug

If you do not have your system setup to build, you can get around by trying to
build within a Docker container. Prereq: Docker is running on your
system, and your username is in the 'docker' group:

    make withdocker

This should copy the xpi built in the container back
to the pwd of your host (and will clean up temp image/container used)

Likewise, to debug with docker:

    make withdocker-debug

Release Notes
==============

0.0.1 : Initial commit... still need to change build script dynamically copy xpi to host from docker containerrather than manually changing name 
