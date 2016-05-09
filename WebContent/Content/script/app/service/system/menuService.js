
/// <reference path="../../../lib/Jquery/jquery-1.4.4.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../ApiPath.js" />
/// <reference path="../../ServerConfiguration.js" />
/// <reference path="../../Config.js" />
/// <summary>外部接口调用服务</summary>
app.factory("$MenuService", function ($OMSMenuService, $BaseMenuService, $BmsMenuService) {
    /// <summary>菜单服务</summary>
    var service = new Array();
    var AddMenu = function (menuList) { $.each(menuList, function (inxex, menu) { service.push(menu) }); }

    service.push({ name: "首页", url: "#/app/home", state: "app.home", icon: "fa-dashboard", detail: [], order: 0 });
    var OmsMenu = $OMSMenuService; if (OmsMenu && ServerConfiguration.StartOMS) { AddMenu(OmsMenu); }

    var BaseMenu = $BaseMenuService; if (BaseMenu && ServerConfiguration.StartOMS) { AddMenu(BaseMenu) }

    var BmsMenu = $BmsMenuService; if (BmsMenu && ServerConfiguration.StartBMS) { AddMenu(BmsMenu); }
    service.sort(function (x, y) { if (!y.order) { y.order = service.length } return (x.order > y.order) ? 1 : -1 });
    return service;
});