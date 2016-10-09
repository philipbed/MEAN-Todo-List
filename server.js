/**
 * File that contains the logic and RESTful API for the NodeJS Server
 *
**/
var express = require('express');
var mongoose = require('mongoose'); // mongodb ODM
var morgan = require('morgan'); // for console output for express
var bodyParser = require('body-parser'); // for parsing HTTP POST params
var methodOverride = require('method-override'); // simulates PUT and DELETE requests
var app = express(); //initialize express app

// connect to db using morgan
var options = {
  user:"philipbed",
  pass:"Obrian96!",
}
mongoose.connect('mongodb://localhost:27017/todoApp',options);

// configure app
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

// define todo model

var Task = mongoose.model('Task',{
  text:String
});

/** routes **/
  //GET
app.get('/api/todos', function(request,response) {
  Task.find(function(err,tasks){
    if (err){
      response.send(err);
    }

    response.json(tasks);
  });
});

//POST
app.post('/api/todos', function(request,response){
  Task.create({
    text: request.body.text,
    done: false
  },
    function(err, task){
      if(err){
        response.send(err);
      }

      Task.find(function(err,tasks){
        if(err){
          response.send(err);
        }
        response.json(tasks);
      });
    });
});

app.delete('api/todos/:task_id',function(request,response){
  Task.remove({
    _id : request.params.task_id
  }, function(err,task){
      if(err){
        response.send(err);
      }

      Task.find(function(err,tasks){
        if(err){
          res.send(err);
        }

        res.json(tasks);
      })
  });
});

// start app on port 8080
app.listen(8080);
console.log("App listening on port 8080");
