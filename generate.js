const fs = require('fs');

fs.readFile('./src.txt', 'utf8', (err, content) => {
  if (err) throw err;

  var sites = content.split('\n').filter(site => site);


  // json
  fs.writeFile('data/list.json', JSON.stringify(sites), { flag: 'w' }, function(err) {
    if (err) throw err;
    console.log('json saved');
  });


  // adblock
  var adblock_header = `\
! Title: zh Content Farms List
! Redirect: https://raw.githubusercontent.com/wildskyf/content-farm-list/master/adblock.txt
! Version: ${(new Date()).toLocaleDateString()}
! Expires: 3 days
!
! Bug reports, additions, questions, comments: Please leave a comment at
! <https://github.com/wildskyf/content-farm-list/issues>
! or email <poppin.wildsky+cf@gmail.com>.
!
! zh Content Farms List - A uBlock Origin filter consisting of
!                         content farms and other fake news sites
!                         with contents mainly in the zh locale
! Ported from 'ihatecontentfarms' by Ben Lau [1]
! Copyright (c) 2017 Wildsky Fann <poppin.wildsky@gmail.com> (Updater dev)
!                    Adrian I Lam <adrianiainlam@gmail.com> (list v1 porter),
!                    Ben Lau <xbenlau@gmail.com> (Original author),
!                    ihatecontentfarms contributors [2]
!
! This program is free software: you can redistribute it and/or modify
! it under the terms of the GNU General Public License as published by
! the Free Software Foundation, either version 3 of the License, or
! (at your option) any later version.
!
! This program is distributed in the hope that it will be useful,
! but WITHOUT ANY WARRANTY; without even the implied warranty of
! MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
! GNU General Public License for more details.
!
! For a copy of the GNU General Public License, see
! <http://www.gnu.org/licenses/>.
!
! [1]: <https://github.com/benlau/ihatecontentfarms>
! [2]: <https://github.com/benlau/ihatecontentfarms/graphs/contributors>`;
  sites.forEach(site => {
    adblock_header += `||${site}\n`;
  });

  fs.writeFile('data/adblock.txt', adblock_header, { flag: 'w' }, function(err) {
    if (err) throw err;
    console.log('adblock saved');
  });

});
