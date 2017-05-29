var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var moment=require('moment');
var mongo=require('mongodb');
var host ='localhost';
var port=27017;
var server=new mongo.Server(host,port,{auto_reconnect:true});
var db=new mongo.Db('node-mongo-example',server,{safe:true});//系统会自动创建node-mongo-example这个数据

/* GET home page. */
router.get('/', function(req, res, next) {
    db.open(function(err,db){
        if(err) throw err;
        console.log('You are success to connect the database');
        db.collection('goods',function (err,collection) {
            var page=req.query.page;
            collection.find({}).toArray(function (err,docs) {
                if(err) throw err;
                else {
                    var count=0;
                    docs.forEach(function (i) {
                        count++;
                    });
                    collection.find({},{sort:{signAt:-1},limit:6,skip:6*(page-1)}).toArray(function (err,docs) {
                        if(err) throw err;
                        else {
                            docs.forEach(function (i) {
                                i.signAt=moment(i.signAt).format('YYYY-MM-DD HH:mm:ss');
                            });
                            res.render('list', {docs,count:count});
                            console.log(docs);
                            db.close();
                            next();
                        }
                    });
                }
            });
        });
    });
    db.on('close',function(err,db){
        if(err) throw err;
        else {
            console.log('成功关闭数据库');
        }
    });

});

module.exports = router;
