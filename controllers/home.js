const ExperimentPost = require('../models/Experiment-Posts')

module.exports = async (req,res) =>{
    ExperimentPost.find({}).then((posts)=>{
        res.render('index',{
            posts
        })
    })
   
}