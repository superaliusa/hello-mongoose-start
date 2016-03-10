var express = require('express'),
    logger  = require('morgan')('dev'),
    path    = require('path'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bodyParser = require('body-parser'),
    server  = express();

//Todo Model
var todoSchema = new Schema({
desc: {
type: String,
required: true
},
completed: {
  type: Boolean,
  required: true
}
});

var Todo = mongoose.model('Todo', todoSchema);

//create a connection to our db
mongoose.connect('mongodb://localhost/todoApplication')
var port = process.env.PORT || 9000;

server.use(express.static(path.join(__dirname,'public')));
server.use(logger);

server.use(bodyParser.json()); //for parsing application/json
server.use(bodyParser.urlencoded({extended: true}));

server.get('/', function(req, res){
  res.send('this is a starter application, welcome!');
});

server.get('/api/todos', function(req, res){
  Todo.find(function(err, todos){
    if(err) throw err;

    res.json(todo);
  });
});

server.post('/api/todos', function(req, res){
  var desc =req.body.desc;
  var completed = req.body.completed;
  var todoObj = {
    desc: desc,
    completed: false
  };
  Todo.create(todoObj, function(err, todo){

  });
});

server.put('/api/todos/:id', function(req, res){
res.send('I updated a todo!');
});

server.delete('/api/todos/:id', function(req, res){
res.send('Oh no! I deleted todo!');
});
server.listen(port, function(){
  console.log('Now listening on port ' + port);
});
