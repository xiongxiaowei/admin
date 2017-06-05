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
1. 设计接口
   <table border="1" cellpadding="0" cellspacing="0" width="500">
  <thead>
    <tr>
      <th>接口</th>
      <th>功能</th>
      <th>接收参数和返回值</th>   
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>api/remove</td>
      <td>清空数据库</td>
      <td></td>
    </tr>
    <tr>
      <td>api/add</td>
      <td>增加一条记录</td>
      <td>接受当前设置的字段信息</td>
    </tr>
    <tr>
      <td>api/remove/:id</td>
      <td>删除一条记录</td>
      <td>接收当前id:string</td>
    </tr>
    <tr>
      <td>api/update/:id</td>
      <td>更新一条记录</td>
      <td>接收当前id:string</td>
    </tr>
    <tr>
      <td>api/find</td>
      <td>查询所有记录</td>
      <td>返回res.data:Array</td>
    </tr>
    <tr>
      <td>api/find/:id</td>
      <td>查询一条记录</td>
      <td>接受当前id:string,返回res.data:object</td>
    </tr>
    <tr>
      <td>api/find/:page</td>
      <td>接收page:number</td>
      <td>返回某页记录res.data:Array</td>
    </tr>
    <tr>
      <td>api/find/pages</td>
      <td>查询总页数</td>
      <td>返回pages:number</td>
    </tr>
  </tbody>
1.  用angular.js或者vue.js获取接口数据（由于前后端分离，这里可能存在端口冲突的问题，需要配置一下）然后渲染前端
为了达到更好的用户体验，我会用rxjs处理模糊查询     
