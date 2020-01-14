var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: true
    },
    createdon:{
        type: Date,
        default: Date.now()
    }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;