const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: {
        type: String,
        required: [true, 'UserName field is required'],
        maxlength: 100
    },
    score: {
        type: String,
        required: [true, 'Score field is required'],

    },
    best_time: {
        type: String//,
        //required: [true, 'Score field is required'],
    },
    position: {
        type: String
    },
    /* password2: {
         type: String,
         required: [true, 'Retype password field is required'],
         minlength: 8
 
     },*/
    token: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }

});

/*userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    delete obj.dateCreated;
    delete obj.token;
    delete obj.password;
    return obj;
}*/

const User = mongoose.model('User', userSchema);

module.exports = User;
