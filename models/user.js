const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thechampsant:mynameis42@cluster0.rdzlw4p.mongodb.net/SteamPost', {useNewUrlParser: true});
const Schema = mongoose.Schema;

const UserLogin = new Schema({ username: String, password: String}, { collection : 'user' });

const User = mongoose.model('User', UserLogin);

module.exports = User