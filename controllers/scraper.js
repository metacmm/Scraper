var express = require("express");
var router = express.Router();

//Scraping tool
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

// get all articles with notes
router.get("/", function (req, res) {
    db.Article.find({}, {}, { limit: 10 })
        .sort({ createdon: -1 })
        .populate("notes")
        .then(function (dbArticle) {
            var articles = [];
            for (var i = 0; i < dbArticle.length; i++) {
                articles.push(dbArticle[i]);
                articles[i].collapseId = "collapse" + articles[i]._id;
                articles[i].collapseIdRef = "#" + articles[i].collapseId;
                articles[i].panelHeading = "heading" + articles[i]._id;
            }
            var hbsObject = {
                articles: articles
            };
            console.log(articles);
            res.render("index", hbsObject);
        })
        .catch(function (err) {
            console.log(err);
        });
});

//find site link and update ui, insert link to db
router.get("/scrape", function (req, res) {
    scrapeEchoJs(res);
});

//create new note and update articles
router.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            db.Article.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { notes: dbNote._id } },
                { new: true })
                .then(function (dbArticle) {
                    console.log(dbArticle);
                    res.status(200).end();
                })
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).end();
        });
});

// delete note
router.get("/note/:id", function (req, res) {
    db.Note.deleteOne({ _id: req.params.id })
        .then(function (data) {
            console.log(data.deletedCount + "is deleted");
            res.status(200).end();
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).end();
        });
});

// get all favorite true articles with notes
router.get("/favorite", function (req, res) {
    db.Article.find({ favorite: true }, {}, { limit: 10 })
        .sort({ createdon: -1 })
        .populate("notes")
        .then(function (dbArticle) {
            var articles = [];
            for (var i = 0; i < dbArticle.length; i++) {
                articles.push(dbArticle[i]);
                articles[i].collapseId = "collapse" + articles[i]._id;
                articles[i].collapseIdRef = "#" + articles[i].collapseId;
                articles[i].panelHeading = "heading" + articles[i]._id;
            }
            var hbsObject = {
                articles: articles
            };
            console.log(articles);
            res.render("index", hbsObject);
        })
        .catch(function (err) {
            console.log(err);
        });
});

// update article favorite value
router.post("/favorite/:id", function (req, res) {
    db.Article.update({ _id: req.params.id }, req.body, function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).end();
        } else {
            console.log("favorit of " + req.params.id + " changed to " + req.body.favorite);
            res.status(200).end();
        }
    });
});

// scrape the site of echojs
var scrapeEchoJs = function (res) {
    axios.get("http://www.echojs.com/").then(function (response) {
        var $ = cheerio.load(response.data);

        $("article h2").each(function (i, element) {
            var result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            insertToAriticle(res, result);
        });

    });
}

// insert data scraped from website to mongodb
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