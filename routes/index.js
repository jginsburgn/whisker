var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Whisker' });
});

router.get('/genesis', async function (req, res) {
  if (req.user) { // Logged in
    // Show wallet
    req.user.transactions = await req.user.getTransactions();
    res.render('wallet', {user: req.user});
  }
  else { // Not logged in
    res.render('login');
  }
});

router.get('/register', function (req, res) {
  if (req.user) { // Logged in
    // Close session
    req.session.destroy();
    delete req.user;
    delete req.session;
  }
  res.render('register');
});

router.get('/transaction-add', function(req, res) {
  if (req.user) { // Logged in
    // Show wallet
    res.render('transaction-add', {user: req.user});
  }
  else { // Not logged in
    res.render('login');
  }
});

router.post('/transaction-edit', async function(req, res) {
  if (req.user) { // Logged in
    // Show wallet
    console.log(req.body);
    res.render('transaction-edit', {user: req.user, transaction: await req.user.getTransaction(req.body.id)});
  }
  else { // Not logged in
    res.render('login');
  }
});

module.exports = router;
