var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb){
    request("http://www.nytimes.com", function(err, res, body){
        var $ = cheerio.load(body);
        var articles = [];

        $(".theme-summary").each(function(i, element){
            var head =$(this).children(".story-heading").text().trim();
            var summy = $(this).children(".summary").text().trim();
            if(head && summy){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var summyNeat = summy.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var dataToAdd = {
                    headline: headNeat,
                    summy: summyNeat
                };
                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;