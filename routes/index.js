

// Again we are importing the libraries we are going to use
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const request = require('request');
const env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
};


// On our router variable, we'll be able to include various methods. For our app we'll only make use of GET requests, so the method router.get will handle that interaction. This method takes a string as its first parameter and that is the url path, so for the first route we are just giving it '/', which means the default route.
router.get('/', function (req, res) {
  var myjumbotext = "This is a starter kit with Express, Embedded JS (EJS), Node.js and Bootstrap-4.0.0"
  res.render('pages/index',{metatitle:"Starter Kit Title",myjumbotitle:"Hello World",myjumbotext:myjumbotext});
})
// Perform the login
router.get(
  '/login',
  passport.authenticate('auth0', {
    clientID: env.AUTH0_CLIENT_ID,
    domain: env.AUTH0_DOMAIN,
    redirectUri: env.AUTH0_CALLBACK_URL,
    audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
    responseType: 'code',
    scope: 'openid'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  }
);



// for mongoDB
var faker = require('faker')
var Student = require('../models/students_model')

router.get('/add_student', function(req, res, next) {
    res.render('pages/add_student')
})

router.post('/add_student', function(req, res, next) {
    var student = new Student()

    student.name = req.body.student_name
    student.age = req.body.student_age
    student.gender = req.body.student_gender
    student.profile_photo = faker.image.image()

    student.save(function(err) {
        if (err) throw err
        res.redirect('/add_student')
    })
})

// to fake data for dev
// https://github.com/marak/Faker.js/
router.get('/generate-fake-data', function(req, res, next) {
    for (var i = 0; i < 90; i++) {
        var student = new Student()

        student.name = faker.name.firstName()
        student.age = 10
        student.gender = "Male"
        student.profile_photo = faker.image.image()

        student.save(function(err) {
            if (err) throw err
        })
    }
    res.redirect('/students/1')
})

router.get('/students/:page', function(req, res, next) {
    var perPage = 9
    var page = req.params.page || 1

    Student
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, students) {
            Student.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('pages/students', {
                    students: students,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})


router.get('/students/:page', function(req, res, next) {
  
})

// Finally, we export this module so that we can import it in our app.js file and gain access to the routes we defined.
module.exports = router;