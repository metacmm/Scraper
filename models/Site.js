var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SiteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link:{
        type: String,
        required:true
    }
});

var Site = mongoose.model("Site", SiteSchema);

module.exports = Site;