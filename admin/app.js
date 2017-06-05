var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo=require('mongodb');
var host ='localhost';
var port=27017;
var server=new mongo.Server(host,port,{auto_reconnect:true});
var db=new mongo.Db('node-mongo-example',server,{safe:true});//系统会自动创建node-mongo-example这个数据库

var index = require('./routes/index');
var list = require('./routes/list');
var update = require('./routes/update');
var detail = require('./routes/detail');
var add = require('./routes/add');



var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/list', list);
app.use('/detail', detail);
app.use('/add', add);
app.use('/update', update);

// catch 404 and forward to error handler
app.all('/modify',function (req,res) {
    var docs={
        brandCode:req.body.brandCode,
        brand:req.body.brand,
        number:req.body.number,
        price:req.body.price,
        shouldPay:req.body.shouldPay,
        alreadyPay:req.body.alreadyPay,
        person:req.body.person,
        email:req.body.email,
        clientDescription:req.body.clientDescription,
        signAt:new Date().getTime()
    };
    db.open(function(err,db){
        if(err) throw err;
        console.log('You are success to connect the database');
        db.collection('goods',function (err,collection) {
            var ObjectID = mongo.ObjectID;
            collection.update({_id:ObjectID(req.body._id)},{$set:{
                number:req.body.number,
                price:req.body.price,
                shouldPay:req.body.shouldPay,
                alreadyPay:req.body.alreadyPay,
                person:req.body.person,
                email:req.body.email,
                clientDescription:req.body.clientDescription,
                lastModify:new Date().getTime()}
                },{safe:true},function (err,docs) {
                if (err) {throw err;}
                else{
                    res.render('success',{title:"已成功修改订单"});
                    db.close();
                }
            });
        });
    });
    db.on('close',function(err,db){
        if(err) throw err;
        console.log('成功关闭数据库');
    });
});
app.get('/remove',function (req,res) {
    db.open(function(err,db){
        if(err) throw err;
        console.log('You are success to connect the database');
        db.collection('goods',function (err,collection) {
            var ObjectID = mongo.ObjectID;
            collection.remove({_id:ObjectID(req.query.id)},function (err,docs) {
                if (err) {throw err;}
                else{
                    res.render('success',{title:"已成功删除订单"});
                    db.close();

                }
            });
        });
    });
    db.on('close',function(err,db){
        if(err) throw err;
        console.log('成功关闭数据库');
    });
});
app.post('/insert',function (req,res){
    var docs={
        brandCode:req.body.brandCode,
        brand:req.body.brand,
        number:req.body.number,
        price:req.body.price,
        shouldPay:parseInt(req.body.number)*req.body.price,
        alreadyPay:req.body.alreadyPay,
        person:req.body.person,
        email:req.body.email,
        clientDescription:req.body.clientDescription,
        signAt:new Date().getTime()
    };
    db.open(function(err,db){
        if(err) throw err;
        console.log('You are success to connect the database');
        db.collection('goods',function (err,collection) {
            collection.insert(docs,function (err,docs) {
                if (err) {throw err;}
               else{
                  res.render("success",{title:"已成功增加订单"});
                  db.close();
                }
            });
        });
    });
    db.on('close',function(err,db){
        if(err) throw err;
        console.log('成功关闭数据库');
    });
});
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
