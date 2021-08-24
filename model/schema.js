const mongoose = require("mongoose");
const schema = mongoose.Schema;

const NewSchema = new schema({
    
    title : {
        type:String,
        required:true,
    },

    snippet : {
        type:String,
        required:true,
    },
    body : {
        type:String,
        required:true,
    },
},{timestamps:true});

const SchemaUse = mongoose.model('blog',NewSchema);

module.exports = SchemaUse;