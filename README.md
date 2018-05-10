### 说明
***
这是本人学习Nodejs时做的一个实验项目，采用了Express做为基础框架，我对传统的项目结构做了一下调整，相比传统的 MVC开发方式来说，我希望按不同的业务模块进行目录划分，每个模块目录可拥有独立的controller、service、model、static等，这样可以让负责不同业务模块的开发人员更关注业务本身。  
目前这个项目基本可以达到使用需求，希望能有人继续完善并使用它。

<div class="row"><div class="col-md-6"><h3>我的目录结构 [方括号为可选目录]</h3><pre style="color:#555555;line-height: 22px;">├─<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span> <strong>app</strong> -> 项目主目录
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
├─<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span> core //框架核心库
│   |─ base.js      //基础文件，包括了控制层，服务层和模型层的加载处理
│   |─ db.js        //数据库处理的封装，对SequelizeJS做了封装
│   |─ router.js    //路由处理代码
│   |─ utils.js     //框架提供的通用函数等
│   └─ bridge.js    //具体业务系统通用代码 桥接文件
├─<span class="glyphicon glyphicon-file"></span> run.js         //启动文件
└─<span class="glyphicon glyphicon-file"></span> config.json    //全局配置文件
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

### 框架的封装
***
对框架再做一层封装是为了让项目团队能使用统一的一套开发规范而做的，在不同的项目和不同的团队中，很有可能会用到不同的技术框架，单从业务角度出发，其实更关注业务层的逻辑代码，假如公司的技术栈使用的是Nodejs，如果一共做了5个项目，都是使用 express 做为项目的基础框架，我们在这些项目上做了许多业务开发工作，但在项目后期对框架的升级维护是比较麻烦的事情，比如框架升级后是否有兼容性的问题，如果因某些原因需要更换框架，可能会对业务代码进行相当大的改动或是重新开发，如果能一开始就按照一定约束规范去开发项目，对核心框架代码进行统一封装调用，或许可以尽可能少的去避免这些问题，比如我可以在将已开发完的项目换成KOAJS，但是我不需要再过多的去修改我的业务逻辑。

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

### 参考
[路由配置](docs/路由配置.md)