var fetch = require('node-fetch');
var cheerio = require('cheerio');
var $;

// date format for crossfitsterling.com june-16-2016

var date = new Date();
var day = date.getDate();
var nextDay = date.getDate() + 1;
var year = date.getFullYear();
var months = new Array();
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

var month = months[date.getMonth()].toLowerCase();

var today = `${month}-${day}-${year}`;
var tomorrow = `${month}-${nextDay}-${year}`;

fetch(`https://www.crossfitsterling.com/${tomorrow}`).then(function(res){
  if(res.url === 'https://www.crossfitsterling.com/' || res.status === 500){
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
      .replace(/DU/g, 'Double Unders')
      .replace(/AMRAP/g, 'as many rounds as possible')
      .replace(/EMOM/g, 'every minute on the minute')
      .replace(/KB/g, 'kettle bell')
      .replace(/CFBG/g, 'crossfit bluegrass')
      .replace(/KB/g, 'kettle bell')
      .replace(/ x /g, ' times ');
    console.log(entryText);
  }
});
