### 项目整体架构分析
- `express` 做后台框架
- `bootstrap` 做页面渲染
- `moment` 处理时间时间戳 语法：`moment(时间戳).format('YYYY-MM-DD HH:mm:ss');`
- `body-parse` 获取参数
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
    
2. moment处理时间戳
```
      docs.forEach(function(i){
          i.signAt=moment( i.signAt).format('YYYY-MM-DD HH:mm:ss');
       }) 
```

3.  分页和排序
  怎么拿到页数？
    -  先拿到数据库count总数，随便查一下，拿到数据docs遍历即可拿到count `page页数=Math.ceil(count/每页想要显示的数据数)`
    -  排序  `collection.find({},{sort:{signAt:-1},limit:6,skip:6*(page-1)}).toArray(function（err,docs）{}) `

4. 倒计时

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
5.启动(本地需要安装mongodb)
-  `npm run start`


  