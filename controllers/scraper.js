var express = require("express");

var router = express.Router();

//Scraping tool
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

router.get("/", function(req, res){
    db.Article.find({})
    .then(function(dbArticle){
        var hbsObject = {
            articles:dbArticle
        };
        console.log(hbsObject.articles);
        res.render("index",hbsObject);
    })
    .catch(function(err){
        console.log(err);
    });
});

router.post("/scrape", function (req, res) {
    //find site link and update ui, insert link to db
    scrapeEchoJs(res);
});

router.get("/articles/:id", function (req, res) {
    //list all notes binding with the articles
});

router.post("/articles/:id", function (req, res) {
    //create new note and update articles
});

var scrapeEchoJs = function (res) {
    axios.get("http://www.echojs.com/").then(function (response) {
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("article h2").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            //todo - add site
            insertToAriticle(res, result);
        });

    });
}

var insertToAriticle = function (res, data) {
    db.Article.create(data)
        .then(function (dbArticle) {
            console.log(dbArticle);

            res.status(200).end();
        })
        .catch(function (err) {
            console.log(err);
        });
}

module.exports = router;