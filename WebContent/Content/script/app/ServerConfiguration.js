
/*
配置文件，为了将配置性的信息与常变的开发信息分离
有效的减少多人开发在配置时产生的代码覆盖
*/
var ServerConfiguration = {
    /// <summary>OMS服务配资</summary>
    //OMS请求地址
    //开启OMS系统
    StartOMS: false,
     OMSPath: "http://192.168.1.84:8081/oms-api",
    // OMSPath: "http://192.168.1.116:8080/oms-api",
    //  OMSPath: "http://115.28.129.13:8081/oms-api",
    //开启BMS系统
    StartBMS: true,
    //BMS请求地址
    BMSPath: "http://192.168.1.84:8081/bms-api",
    //是否启动开发,True的话全部菜单可用，false的话全部菜单与数据库的权限对接
    Version: "dev",
    IsDevelop: true,
}