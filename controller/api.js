import MongoClient from 'mongodb';
import { ObjectId } from 'mongodb';
import user from '../models/User.js';
import exercise from '../models/Exercise.js';

module.exports = (app, db) => {
  const Users = db.collection('appusers');
  const Logs  = db.collection('applogs');
  
  app.get('/', (req, res) => res.sendFile(process.cwd() + '/views/index.html'));
  
  app.get('/users', (req, res) => {
    Users.find({}).toArray((err, docs) => err ? res.json({result: err}) : res.json({result: docs}));
  });
  
  app.post('/add', (req, res) => {
    Users.findOne({_id: ObjectId(req.body._id)}, (err, docs) => {
      if (err) return res.json({result: err});
      
      let new_exercise = new exercise({
        for_userId:  docs.user_id,
        description: req.body.description,
        duration:    req.body.duration,
        date:        new Date(req.body.date)
      });
      
      Logs.insertOne(new_exercise, (err, docs) => err ? res.json({result: err}) : res.json({result: docs}));
    });
  });
  
  app.post('/new', (req, res) => {
    Users.findOne({username: req.body.username}, (err, docs) => {
      if (err) return res.json({result: err});
      
      if (docs) {
        return res.json({result: 'Username taken.'});
      } else {
        let new_user = new user({user_id: ObjectId(), username: req.body.username});
        Users.insertOne(new_user, (err, docs) => err ? res.json({result: err}) : res.json({result: docs}));
      }
    });
  });
  
  app.get('/log/user', (req, res) => {
    Users.findOne({_id: ObjectId(req.query._id)}, (err, docs) => {
      if (err) return res.json({result: err});
      
      if (docs) {
        Logs.find({for_userId: docs.user_id}).toArray((err, docs) => err ? res.json({result: err}) : res.json({result: docs}));
      }
    });
  });
  
};