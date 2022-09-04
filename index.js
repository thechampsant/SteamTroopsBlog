const express = require('express');
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const flash = require('connect-flash')
const {body} = require('express-validator')

let port = process.env.PORT || 3000

const homeController = require('./controllers/home');
const loginController = require('./controllers/login')
const createController = require('./controllers/create')
const postStoreController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

const authMiddleware = require('./middleware/authMiddleware');
const redirectMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

const app = express();
app.set('view engine', 'ejs');

app.use('/public/',express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())
app.use(expressSession({
    secret:'keyboard cat',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

global.loggedIn = null;

app.use("*",(req,res,next) => {
    loggedIn = req.session.userId;
    next()
})

app.get('/',homeController);
app.get('/loginUser',loginController);
app.get('/post/create',authMiddleware,createController);
app.post('/posts/store',[
    body('title').not().isEmpty().withMessage('Title cannot be empty'),
    body('description').not().isEmpty().withMessage('Description cannot be empty'),   
    body('subject').not().isEmpty().withMessage('Please select any one subject'),
    body('material').not().isEmpty().withMessage('Material is required cannot be empty'),
    body('safetyPrecautions').not().isEmpty().withMessage('Safety is required cannot be empty'),
    body('stepDescription').not().isEmpty().withMessage('Step description is required cannot be empty'),

],postStoreController)
app.get('/post/:id',getPostController)
app.post('/user/login',redirectMiddleware,loginUserController)
app.get('/user/logout',logoutController)

app.use((req,res) => res.render('notfound'))

app.listen(port, () =>{
    console.log('App is running on port 3000');
})