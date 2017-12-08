var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

const User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async function (req, res) {
  var body = req.body;
  try {
    var user = await User.register(body.name, body.email, body.password);
    req.session.user = body.email;
    user.transactions = await user.getTransactions();
    res.render('wallet', { user: user });

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'gator4138.hostgator.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "test@itsof.me", // generated ethereal user
        pass: "o3fvQX8XsgfA"  // generated ethereal password
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '<test@itsof.me>', // sender address
      to: 'pablodelamorav@gmail.com', // list of receivers
      subject: 'Welcome to Whisker', // Subject line
      text: 'Be happy', // plain text body
      html: '<b>Be happy</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  } catch (error) { // Email already registered
    res.render('login', { message: "That account already exists." });
  }
});

router.post('/login', async function (req, res) {
  var body = req.body;
  try {
    var user = await User.login(body.email, body.password);
    user.transactions = await user.getTransactions();
    req.session.user = body.email;
    res.render('wallet', { user: user });
  } catch (error) {
    res.render('login', { message: "Wrong credentials." });
  }
});

router.get('/logout', async function (req, res) {
  req.session.destroy();
  res.render('login');
});

module.exports = router;
