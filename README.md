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

### 运行
下载源码，进入源码根目录，先安装express-moduledev依赖包
```shell
npm i express-moduledev
```
安装完成后，运行以下命令启动项目
```javascript
node run.js
```

### 浏览
在浏览器输入以下地址浏览demo
```
http://localhost:801
```

### 框架源码
https://github.com/rob668/express-moduledev