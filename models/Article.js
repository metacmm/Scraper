var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: false
    },
    favorite:{
        type: Boolean,
        default:false,
        required: true
    },
    site:{
        type:String,
        required:false
    },
    notes:[{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;