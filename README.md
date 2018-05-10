### 说明
***
这是本人学习Nodejs时做的一个实验项目，采用了Express做为基础框架，我对传统的项目结构做了一下调整，相比传统的 MVC开发方式来说，我希望按不同的业务模块进行目录划分，每个模块目录可拥有独立的controller、service、model、static等，这样可以让负责不同业务模块的开发人员更关注业务本身。
<div class="row"><div class="col-md-6"><h3>目录结构 [方括号为可选目录]</h3><pre style="color:#555555;line-height: 22px;">├─<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span> <strong>app</strong> -> 项目主目录
  │  |─<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span> modules    //模块目录
  │  │  |─<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span> module_A   //业务模块A
  │  │  │  |─<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span> ctrls 控制器文件
  │  │  │  |  └─ controller1.js
  │  │  │  |─<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span> views 视图模板文件
  │  │  │  |  └─ index.html
  │  │  │  |─<font color="gray"><span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span> [static] 静态文件等</font>
  │  │  │  |─<font color="gray"><span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span> [models] 数据处理文件</font>
  │  │  │  |─<font color="gray"><span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span> [servs]  服务层 业务处理</font>
  │  │  │  └─<font color="gray"><span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span> [router.js] 模块的路由配置文件</font>
  │  │  |──<span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span> module_B 模块B
  │  |─<span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span> [models]     //ORM 数据库模型定义文件（放在顶级，表示可通用）
  │  |─<span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span> [routes]     //通用路由器配置
  │  |─<span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span> [views]      //通用视图模板文件存放位置
  │  └─<span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span> [ctrls]      //通用控制器文件
  ├─<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span> config -> 环境配置目录
  │   |─ default.js 默认配置文件
  │   |─ <font color="gray">[development.js]  //开发环境配置文件</font>
  │   |─ <font color="gray">[production.js]   //生产环境配置文件</font>
  │   └─ <font color="gray">[testing.js]      //测试环境配置</font>
  └─<span class="glyphicon glyphicon-file"></span> run.js         //启动文件
  </pre></div><div class="col-md-6"><h3>Express 应用生成器的目录结构：</h3><pre style="color:#555555;line-height: 22px;">├──<span class="glyphicon glyphicon-file"></span> app.js
  ├──<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span> bin
  │　　└── www //应用的主入口
  │── package.json
  │──<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span> public
  │　　├── images
  │　　├── javascripts
  │　　└── stylesheets
  │　　　　 └── style.css
  │──<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span> routes
  │　　├── index.js
  │　　└── users.js
  └──<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span> views
  │　　├── error.jade
  │　　├── index.jade
  │　　└── layout.jade
  │──<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span> controllers
  │　　├── controller1.js
  │　　└── controller2.js
</pre>
</div>
</div>

### 安装
```shell
npm i express-moduledev
```

### 使用
在您的项目根目录，新建启动文件run.js

```javascript
//run.js
var em = require('express-moduledev');
//指定seesion存储类型
//var RedisStore = require('connect-redis')(em.session);
var FileStore = require('session-file-store')(em.session);

//配置启动环境参数等
var config = {
    "port":8000,
    //使用环境 'default','development','production','testing'
    "use_env": "development",
    //顶级路由存放目录名称 默认routes
    //"router":"routes/",
    "session_store": {
        "secret": 'a345bc!',
        "cookie": {  maxAge: 1000 * 60 * 60  },
        "resave": true,
        "saveUninitialized": false,
        "store": new FileStore
    }
}
//运行
em.Run(config)
em.log.p('server runing..')
```

### 路由的封装
在Express中，已提供了丰富的路由功能，通常情况下，我们会可以将不同模块的路由单独写到一个JS文件里，然后通过在启动时require引入路由，但在每一个路由文件里，都需要引入Express，看一样官方基础路由的例子:
```js
var express = require('express');
var app = express();
//var router = express.Router();
app.get('/', function(req, res) {
  res.send('hello world');
});
//如果将回调函数写到另外一个文件里，同样还需要引入这个文件
var helloworld = require('./controller');
app.get('/', helloworld);
```

我想通过配置路由规则的方式自动实现这些操作，只需要通过配置定义好路由规则和控制器参数等，让框架自动处理：
```js
exports.routers = [
    { prefix:"/index.html",  ctrl:"RouterController", action:"index" }
]
```
请参考：[路由配置](docs/路由配置.md)

### ORM的封装
ORM 底层使用了SequelizeJS，我对数据模型的定义做了一层封装，让数据定义更简单一点，同时我们可以对数据库模型添加方法，方便使用。

请参考：[数据模型定义](docs/数据模型定义.md)

### DEMO
http://www.robweb.cn/demos

### 更多说明
请参考：[docs/](docs)