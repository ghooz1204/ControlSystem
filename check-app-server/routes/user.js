// var express = require('express');
// var router = express.Router();
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// module.exports = router;

module.exports = function(app, User) {

  app.get('/api/users', function(req, res) {
    // ALL Data Find API
    User.find(function(err, users){
      if(err) res.status(500).send({error: 'database failure'});
      else res.json(users);
    });
  });

  app.get('/api/users/:name', function(req, res) {
    // Only one Data Find API
    User.findOne({name: req.params.name}, function(err, user) {
      if(err) return res.status(500).json({error: err});
      if(!user) return res.json({error: '404'});
      else {
        res.json(user);
      }
    });
  });

  app.post('/api/users', function(req, res) {
    // Create Data API
    var user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.save(function(err) {
      if(err) res.json({result: 0});
      else res.json({result: 1});
    });
  });

  app.put('/api/users/:name', function(req, res) {
    // Update Data API
    User.findById({name: req.params.name}, function(err, user) {
      if(err) return res.status(500).json({error: 'database failure'});
      if(!user) return res.status(404).json({error: 'user not found'});

      if(req.body.name) user.name = req.body.name;
      if(req.body.password) user.password = req.body.password;

      user.save(function(err) {
        if(err) res.status(500).json({error: 'failed to update'});
        else res.json({message: 'user update'});
      });
    });
  });

  app.delete('/api/users/:name', function(req, res) {
    // Delete Data API
    User.remove({name: req.params.user_name}, function(err, output) {
      if(err) res.status(500).json({error: 'database failure'});
      else res.state(204).end();
    });
  });

  app.options('/api/users', function(req, res) {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send();
  });
}