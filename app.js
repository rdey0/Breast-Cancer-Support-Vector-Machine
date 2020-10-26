var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var graphRouter = require('./routes/graph');
const {PythonShell} =require('python-shell'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/graph', graphRouter);
var model_accuracy = '0'

app.post("/graph", (req, res, next)=>{ 
  const get_graph = 'get_svm_plot.py';
  var x1_label = req.body.x_var;
  var x2_label = req.body.y_var;
  var degree = req.body.degree;
  var cost = req.body.cost;
    
  const options = {
      args:[x1_label, x2_label, degree, cost],
      scriptPath: './svm_scripts'
  };

  PythonShell.run(get_graph, options, (err, results)=>{
      if(err){
          console.log(err);
      }
      console.log(results);
      model_accuracy = results[0]
      res.sendFile(__dirname + '/graph/graph.png', options, (err) =>{
        if(err)
          console.log(err);
      });
      
  });
}); 

app.post("/optimize_graph", (req, res, next)=>{ 
  const optimize_graph = 'get_optimal_svm_plot.py'
  var x1_label = req.body.x_var;
  var x2_label = req.body.y_var;
    
  const options = {
      args:[x1_label, x2_label],
      scriptPath: './svm_scripts'
  };

  PythonShell.run(optimize_graph, options, (err, results)=>{
      if(err){
          console.log(err);
      }
      console.log(results);
      var best_degree = results[0];
      var best_cost = results[1];
      res.json({best_degree: best_degree, best_cost: best_cost});
  });
}); 

app.get("/accuracy", (req, res)=>{ 
  res.json({accuracy: model_accuracy});
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
