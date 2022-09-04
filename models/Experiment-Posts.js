const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thechampsant:mynameis42@cluster0.rdzlw4p.mongodb.net/SteamPost', {useNewUrlParser: true});
const Schema = mongoose.Schema;

const ExperimentSchema = new Schema({

    title: {type:String,required: true},
    description: {type:String,required: true},
    difficultylevel: {type: String,required: true},
    subject:{type:String,required: true},
    mainImage:{type:String,required: true},
    material:{type:String,required: true},
    safetyPrecautions:{type:String,required: true},
    steps:[
        {
            sImage:{type:String,required: true},
            sDescription:{type:String,required: true}
        }
    ]


})

const ExperimentPost = mongoose.model('ExperimentPost', ExperimentSchema);

module.exports = ExperimentPost