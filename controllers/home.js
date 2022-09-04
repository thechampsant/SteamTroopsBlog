const ExperimentPost = require('../models/Experiment-Posts')

module.exports = async (req,res) =>{
    const posts = await ExperimentPost.find({})
   
    res.render('index',{
        posts
    })
}