const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new mongoose.Schema({

    // we are creating here user field so, that anyone user can't see other's notes
    // so, we are storing the user_id of the user which is already present in the user model(user schema @ User.js)
    // this user field contains the objectId of the user who is logged in .
    user:{
        type : mongoose.Schema.Types.ObjectId,
        // here we are giving reference of user model (in User.js)
        ref : 'user'
    },
    title : {
        type : String,
        required : true,   
    },
    description : {
        type: String,
        required:true,
    },
    tag : {
        type: String,
        default:"General"
        
    },
    date : {
        type: Date,
        default : Date.now
    }
    
  });

const notes = mongoose.model('notes', NotesSchema);

module.exports = notes; 