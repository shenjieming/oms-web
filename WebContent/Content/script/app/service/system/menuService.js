
/// <reference path="../../../lib/Jquery/jquery-1.4.4.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../ApiPath.js" />
/// <reference path="../../ServerConfiguration.js" />
/// <reference path="../../Config.js" />
/// <summary>外部接口调用服务</summary>
app.factory("$MenuService", function ($OMSMenuService, $BaseMenuService) {
    /// <summary>菜单服务</summary>
    var service = new Array();
    service.push({
        name: "首页", url: "#/app/home", state: "app.home", icon: "fa-dashboard", detail: []
    });
    var OmsMenu = $OMSMenuService;
    if (OmsMenu && ServerConfiguration.StartOMS) {
        $.each(OmsMenu, function (inxex, menu) { service.push(menu) });
    }

    var BaseMenu = $BaseMenuService;
    if (BaseMenu&&ServerConfiguration.StartBMS) {
        $.each(BaseMenu, function (inxex, menu) { service.push(menu) });
    }
    return service;
});