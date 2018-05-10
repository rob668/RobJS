exports.url_prefix = ["ctrl", "controller"]; //指定模块别名 第一参数为别名，第二个为目录名
exports.static_folder = "static"

exports.routers = [
    {prefix:"index.html",  ctrl:"Controller1", action:"index" },
    {prefix:"multiAction.html", ctrl:"Controller1", method:["GET"], action:["one", "two", "three"]},
    //{prefix:"three.html", ctrl:"Controller1", method:["GET"], action:"three"},
    {prefix:"multiAction.html", ctrl:"Controller2", method:["GET"], action:"onegotwo"},
    {prefix:"multiCtrlAction.html",ctrl:['Controller1', 'Controller2'],method:["GET"],action:[ "one", ["one", "two"] ]  }
]
