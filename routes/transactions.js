var express = require('express');
var router = express.Router();

const User = require('../models/user');

router.post('/add', async function (req, res) {
  var body = req.body;
  var user = req.user;
  try {
    user.addTransaction(body.title, body.amount, body.notes);
  } catch (error) {
    console.log(error);
  }
  user.transactions = await user.getTransactions();
  res.render('wallet', { user: user });
});

router.post('/edit', async function (req, res) {
  console.log(req.body);
  var body = req.body;
  var user = req.user;
  try {
    var transaction = await user.getTransaction(parseInt(body.id));
    var trans = await transaction.updateTransaction(body.title, body.amount, body.notes);
  } catch (error) {
    console.log(error);
  }
  user.transactions = await user.getTransactions();
  res.render('wallet', { user: user });
});

module.exports = router;
