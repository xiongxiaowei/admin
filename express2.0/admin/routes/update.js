var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongo=require('mongodb');
var host ='localhost';
var port=27017;
var server=new mongo.Server(host,port,{auto_reconnect:true});
var db=new mongo.Db('node-mongo-example',server,{safe:true});//系统会自动创建node-mongo-example这个数据

/* GET home page. */
router.get('/', function(req, res, next) {
    db.open(function(err,db){
        if(err) {throw err;}
        console.log('You are success to connect the database');
        db.collection('goods',function (err,collection) {
            // var _id=mongodb.ObjectID.createFromHexString();
            var ObjectID = mongo.ObjectID;
            //
            /*collection.update({_id:ObjectID(req.query.id)},{$set:{title:"台湾出现不明UFO"}},{safe:true},function (err) {
                if (err){throw err;}
                else {
                    console.log("数据更新成功");
                    db.close();
                    res.end("更新数据成功");
                    next();
                }

            });*/
            collection.find({_id:ObjectID(req.query.id)}).toArray(function (err,docs) {
                if(err) {throw err;}
                else {
                    var moment=require('moment');
                    docs.forEach(function (i) {
                        i.signAt=moment(i.signAt).format('YYYY-MM-DD HH:mm:ss');
                    });
                    res.render('update',{docs});
                    db.close();
                    next();
                }
            });
        });
    });
});

module.exports = router;
