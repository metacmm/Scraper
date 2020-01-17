# Scraper

## Overview
Scraper is a web app that users can view and leave comments on the latest news from different websites.

## Instruction

* In initial version, only EchoJS is the source website. Users can get the latest 10 news by clicking "Refresh" button

* User can add/remove the news to/from their favorites by clicking the star on the right of each article list item

* For each article, user is able to add more than one notes and also able to delete any of them. The notes will collapse by default to have the UI clearer

* User can view all the favorites news by clicking "Favorite" button, and back to the original list by clicking "View All" button.

* Sidebar can be hidden by clicking "Toggle Sidebar" button when viewing in smaller screen.

## Design and Technology Stack

This web app uses Bootstrap and native css for styling, jQuery to manipulate DOM and Ajax call. Express is the component, together with MongoDB database to build the back-end framework. Handlebars are used for rendering UI.


cheerio and axios are used for scraping the website.

The web app is hosted by heroku.