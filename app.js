var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var routes = require("./routes/routes")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use(function(req, res, next){
    console.log("req", req.url, req.method);
    var handle = routes[req.url];
    if( !handle || !Object.keys(handle).length || handle.type != req.method) {
        res.send("404"); // 路由未找到
        return ;
    }
    // @TODO 前置拦截，过滤，预处理等 后置处理等----暂时以访问通过为目标
    var controller = new (handle.clz)();
    console.log("controller", handle.clz)
    controller[handle.method]()
        .then(
        (data)=>{
            console.log(data);
            res.send(data)
        })
        .catch(err=>{
            console.log(err)
            res.send(data)
        })

})

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
