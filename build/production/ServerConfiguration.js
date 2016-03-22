/*
配置文件，为了将配置性的信息与常变的开发信息分离
有效的减少多人开发在配置时产生的代码覆盖
*/
var ServerConfiguration = {
    /// <summary>OMS服务配资</summary>
    //OMS请求地址
    OMSPath: "http://scm.med-log.cn/oms-api",    //Path: "http://192.168.1.102:8080/oms-api",    //Path: "http://192.168.0.130:8080/oms-api",
    //BMS请求地址
    BMSPath: "http://192.168.1.84:8081/bms-api",
    //是否启动开发,True的话全部菜单可用，false的话全部菜单与数据库的权限对接
    IsDevelop: false
}
