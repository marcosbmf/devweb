var express = require('express');
var router = express.Router();
var User = require("./../models/user")

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, doc) {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      res.status(200).send(doc)
    }
  })
});

/* Post users listing. */
router.post('/', function(req, res, next) {
  var user = new User(
    {
      name: req.body.name
    }
  )

  user.save(
    fn=function(err, user) {
      if (err) {
        console.log(err)
        res.status(500).send()
      } else {
        res.status(200).send(user)
      }
  })
});

module.exports = router;
