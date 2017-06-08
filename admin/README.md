### 项目整体架构分析
- `node.js` 做后台框架
- `express` 做接口设计
- `bootstrap` 做页面渲染
- `moment` 处理时间戳 语法：`moment(时间戳).format('YYYY-MM-DD HH:mm:ss');`
- `body-parse` 获取参数
- ejs 模板

### 一些技术
1. 字段设置
```
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
```

2. 主键查询
```
    var ObjectID = mongo.ObjectID;
    collection.update({_id:ObjectID(req.body._id)},{$set:{}},{safe:true},function(err,docs){
       docs.forEach(function(i){
          i.signAt=moment( i.signAt).format('YYYY-MM-DD HH:mm:ss');
       })
       res.render("update",{docs})
    })
```    

3. moment处理时间戳
```
      docs.forEach(function(i){
          i.signAt=moment( i.signAt).format('YYYY-MM-DD HH:mm:ss');
       })
```

4.  分页和排序
  怎么拿到页数？
    -  先拿到数据库count总数，随便查一下，拿到数据docs遍历即可拿到count
    ```
    page=Math.ceil(count/每页想要显示的数据数)
    ```
    -  排序  
    ```
    collection.find({},{sort:{signAt:-1},limit:6,skip:6*(page-1)}).toArray(function（err,docs）{})
    ```

5. 倒计时
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
6. 启动(本地需要安装mongodb)
```
npm run dev
```

### 后续我会用angular.js和vue.js重写这个项目,设计思路分析：
1.  用node.js搭建服务器
1.  API设计，[链接]()
1.  用angular.js或者vue.js获取接口数据（由于前后端分离，这里可能存在端口冲突的问题，需要配置一下）然后渲染前端

为了达到更好的用户体验，我会用rxjs处理模糊查询  

1.  [项目更新出现了小问题](https://coding.net/u/judy201654321/p/blog/git/blob/master/files/%E5%95%86%E5%93%81%E5%BD%95%E5%85%A5%E7%B3%BB%E7%BB%9F%E6%9B%B4%E6%96%B0%E5%A4%B1%E8%B4%A5%E5%8E%9F%E5%9B%A0.md)

### node.js改造MYSQL API
- [mysql api](http://htmlpreview.github.io/?https://github.com/xiongxiaowei/NOTES/blob/master/index.html)
- 服务器代码[server.js](http://git.oschina.net/judy201654321/mysql/blob/master/MYSQL%E6%8E%A5%E5%8F%A3%E8%AE%BE%E8%AE%A1/server.js?dir=0&filepath=MYSQL%E6%8E%A5%E5%8F%A3%E8%AE%BE%E8%AE%A1%2Fserver.js&oid=d36e309a0d542c3cf8a009d8e9f6f330a18828de&sha=c26221be858df69ce8da4690e0c579ed50fb7ff0)

### [ANGULAR重写雏形](https://github.com/xiongxiaowei/admin-angular-)
