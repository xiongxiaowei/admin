### 项目整体架构分析
- `express` 做后台框架
- `bootstrap` 做页面渲染
- `moment` 处理时间时间戳 语法：`moment(时间戳).format('YYYY-MM-DD HH:mm:ss');`
- `body-parse` 获取参数（会传递不会获取也是百搭）
- ejs 模板

### 一些技术难关
1. 主键查询
```
    var ObjectID = mongo.ObjectID;
    collection.update({_id:ObjectID(req.body._id)},{$set:{}},{safe:true},function(err,docs){
       docs.forEach(function(i){
          i.signAt=moment( i.signAt).format('YYYY-MM-DD HH:mm:ss');
       }) 
       res.render("update",{docs})
    })
```    
    
1. moment处理时间戳
```
      docs.forEach(function(i){
          i.signAt=moment( i.signAt).format('YYYY-MM-DD HH:mm:ss');
       }) 
```

1.  分页和排序
  怎么拿到页数？1.先拿到数据库count总数，随便查一下，拿到数据【docs】遍历即可拿到count page页数=Math.ceil(count/每页想要显示的数据数)
  排序  `collection.find({},{sort:{signAt:-1},limit:6,skip:6*(page-1)}).toArray(function（err,docs）{}) `
1. 倒计时
```
     <script type="text/javascript">
        function countDown(secs,surl){
            var jumpTo = document.getElementById('jumpTo');
            jumpTo.innerHTML=secs;
            if(--secs>0){
                setTimeout("countDown("+secs+",'"+surl+"')",1000);
            }
            else{
                location.href=surl;
                -ma
            }
        }
    </script>
    <a href="/list"><span id="jumpTo">3</span>秒后系统会自动跳转，也可点击本处直接跳</a>
    <script type="text/javascript">
       countDown(3,'/list');
    </script>  
```


个人感悟
  什么是携带参数？
    携带参数就是数据库的索引字段

  传参
    1.模板通过a标签携带参数 app.get('',function(req,res){res.render('index',{})})方法 获取 a----->req.query 
    2.表单 必须指明方法 get明文传递 app.get接收 post隐藏传递 app.post()方式接受  表单---> req.body._id

  表单怎么做才美观
    肯定是一个div包着两个元素 两者都必须是行内元素并且前者可以设置width span不行)(有毒)，我用的是p（display：inline-block） 
  与服务器通讯
  
  模板数据流动方向？
    
    从哪儿进：从a链接form表单进
    到哪儿去：服务器路由
    数据库信息是怎么流出的？ 从res.render（，{}）函数流出
    流到哪？模板（jade|ejs）
  
