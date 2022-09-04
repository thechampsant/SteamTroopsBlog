const path = require('path')
const {validationResult} = require('express-validator')
var mongoose = require('mongoose');

const ExperimentPost = require('../models/Experiment-Posts')


const createStepImage  = async(req)=>{
    let steps = [];
    if(typeof(req.body.stepDescription) === 'object'){
        for(let index = 0; index < req.body.stepDescription.length; index++) {
            const step = {}
            let sImage = req.files.image[index];
            sImage.mv(path.resolve(__dirname,'../public/assets/img/subImg',sImage.name), (err)=>{
            step.sImage = '/assets/img/subImg/'+sImage.name;
            step.sDescription = req.body.stepDescription[index];
            step._id = new mongoose.Types.ObjectId();
            steps.push(step)
            }) 
        }
        return steps;
    }
    else{
        console.log('else is working');
            const step = {}
            let sImage = req.files.image;
            sImage.mv(path.resolve(__dirname,'../public/assets/img/subImg',sImage.name), (err)=>{
            step.sImage = '/assets/img/subImg/'+sImage.name;
            step.sDescription = req.body.stepDescription;
            step._id = new mongoose.Types.ObjectId();
            steps.push(step)
            }) 
        return steps; 
    }
    
}

module.exports = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('create',{
            errors: errors.array()
        });
    }


    if(req.files !== null){
        try {
            let image = req.files.mainimage
            createStepImage(req).then((steps)=>{
                image.mv(path.resolve(__dirname,'../public/assets/img',image.name), (err)=>{
                    const post = new ExperimentPost(
                            {
                                ...req.body,
                                mainImage:'/assets/img/'+image.name,
                                steps
                            }   
                    )
                    post.save((err,r) =>{
                        console.log(r);
                        res.redirect('/')
                    })
                })
            })
            
        } catch (error) {
            res.render('create',{
                errors: [{msg:'Please both Main and Step Image'}]
            });
        }
        
    }
    else{
        res.render('create',{
            errors: [{msg:'Please Upload Main Image'}]
        });
    }
    
}