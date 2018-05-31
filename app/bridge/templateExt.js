/*
    这是一个第三方库或函数的桥接文件
    比如对nunjucks模板扩展方法

    Author: Rob
    Date: 2017/5/2
*/
module.exports.tpl  = {
    //init将自动执行
    init (app){
        //获取配置信息
        let envcfg = app.config.getEnv();
        //获取模板对象
        let tpl = app.get('tpl');
        //添加一个模板全局变量
        tpl.addGlobal("BaseUrl", envcfg.BaseUrl)
        //添加一个日期过滤器
        tpl.addFilter('formatTimestamp', function(t, f="yyyy-MM-dd HH:mm:ss"){
            return new Date(t*1000).pattern(f)
        })
    }
}