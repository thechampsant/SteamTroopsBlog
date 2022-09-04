const ExperimentPost = require('../models/Experiment-Posts')


module.exports = async(req,res)=>{
    const post = await ExperimentPost.findById(req.params.id)

    res.render('post',{
        post
    })
}