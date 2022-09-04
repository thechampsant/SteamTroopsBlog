const User = require('../models/user');

module.exports = (req,res) =>{
    const {username, password} = req.body
    User.findOne({
        username,
        password
    },(err,user)=>{
        if(user){
            req.session.userId = user._id
            res.redirect('/')
        }
        else{
            res.render('login',{
                msg:'Wrong username or password'
            })
        }
    })
  
}