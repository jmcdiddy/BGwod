var fetch = require('node-fetch');
var cheerio = require('cheerio');
var $;

// date format for crossfitbluegrass.com jan-10-2017

var date = new Date();
var day = date.getDate();
var nextDay = date.getDate() + 1;
var year = date.getFullYear();
var months = new Array();
months[1] = "January";
months[2] = "February";
months[3] = "March";
months[4] = "April";
months[5] = "May";
months[6] = "June";
months[7] = "July";
months[8] = "August";
months[9] = "September";
months[10] = "October";
months[11] = "November";
months[12] = "December";

var month = months[date.getMonth()].toLowerCase();

var today = `${year}-${month}-${day}`;
var tomorrow = `${year}-${month}-${day}`;

fetch(`https://www.crossfitbluegrass.com/blog/`).then(function(res){
  if(res.url === 'https://www.crossfitbluegrass.com/blog/' || res.status === 500){
    return 'not posted'
  } else {
    return res.text();
  }
}).then(function(body){
  if(body === 'not posted'){
    console.log('The workout has not been posted yet');
  } else {
    $ = cheerio.load(body);
    var entry = $('body').find('.entry-content');
    entry.find('p').first().remove();
    var entryText = entry.text().trim()
      .replace(/\n/g, ', ')
      .replace(/AHAP/g, 'as heavy as possible')
      .replace(/T2B/g, 'toes to bar')
      .replace(/K2E/g, 'knees to elbow')
      .replace(/HKR/g, 'hanging knee raises')
      .replace(/AMRAP/g, 'as many rounds as possible')
      .replace(/DU/g, 'double unders')
      .replace(/ME/g, 'max effort')
      .replace(/AMRAP/g, 'as many rounds as possible')
      .replace(/EMOM/g, 'every minute on the minute')
      .replace(/CFBG/g, 'crossfit bluegrass')
      .replace(/KB/g, 'kettle bell')
      .replace(/ x /g, ' times ');
    console.log(entryText);
  }
});
