﻿
/// <reference path="../../../lib/Jquery/jquery-1.4.4.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../ApiPath.js" />
/// <reference path="../../Config.js" />
/// <summary>外部接口调用服务</summary>
app.factory("$MenuService", function ($http, $local) {
    /// <summary>菜单服务</summary>
    var service = new Array();
    service.push({
        name: "首页", url: "#/app/home", state: "app.home", icon: "fa-dashboard", detail: []
    });
    service.push({
        name: "手术订单管理", url: "", state: "app.order", icon: "fa-pencil",
        detail: [
            //{ name: "出库单查询", url: "#/app/order/delivery", state: "app.order.delivery" },
            { name: "综合订单查询", url: "#/app/order/complex", state: "app.order.complex" },
            { name: "我的订单", url: "#/app/order/orderlist", state: "app.order.orderlist" },
            { name: "我的待审批", url: "#/app/order/approval", state: "app.order.approval" },
            { name: "我的待处理", url: "#/app/order/deal", state: "app.order.deal" },
            { name: "我的待签收", url: "#/app/order/sign", state: "app.order.sign" },
            { name: "出库单追加", url: "#/app/order/stock", state: "app.order.stock" },
            { name: "返库申请", url: "#/app/order/apply", state: "app.order.apply" },
            { name: "返库处理", url: "#/app/order/back", state: "app.order.back" },
            { name: "返库草稿箱", url: "#/app/order/feedback", state: "app.order.feedback" },
            { name: "订单草稿箱", url: "#/app/order/draft", state: "app.order.draft" }
        ]
    });
    service.push({
        name: "备货订单管理", url: "", state: "app.stock", icon: "fa-shopping-cart",
        detail: [
            //{ name: "出库单查询", url: "#/app/stock/delivery", state: "app.stock.delivery" },
            { name: "综合订单查询", url: "#/app/stock/complex", state: "app.stock.complex" },
            { name: "我的备货", url: "#/app/stock/list", state: "app.stock.list" },
            { name: "我的待审批", url: "#/app/stock/approval", state: "app.stock.approval" },
            { name: "我的待处理", url: "#/app/stock/deal", state: "app.stock.deal" },
            { name: "我的待签收", url: "#/app/stock/sign", state: "app.stock.sign" },
            { name: "备货草稿箱", url: "#/app/stock/draft", state: "app.stock.draft" }
        ]
    });
    service.push({
        name: "我的业务数据", url: "", state: "app.mybusiness", icon: "fa-drupal",
        detail: [
            { name: "我的模板", url: "#/app/mybusiness/materialtemplate", state: "app.mybusiness.materialtemplate" },
            { name: "我的套件", url: "#/app/mybusiness/kits", state: "app.mybusiness.kits" },
            { name: "我的物料", url: "#/app/mybusiness/material", state: "app.mybusiness.material" },
            { name: "我的地址", url: "#/app/mybusiness/address", state: "app.mybusiness.address" },
            { name: "我的医生", url: "#/app/mybusiness/doctor", state: "app.mybusiness.doctor" }
        ]
    });
    service.push({
        name: "业务数据管理", url: "", state: "app.business", icon: "fa-link", detail: [
            { name: "经销商管理", url: "#/app/business/dlorganization", state: "app.business.dlorganization" },
            { name: "货主管理", url: "#/app/business/oiorganization", state: "app.business.oiorganization" },
            { name: "医院管理", url: "#/app/business/hplmanagement", state: "app.business.hplmanagement" },
            { name: "科室管理", url: "#/app/business/dptmanagement", state: "app.business.dptmanagement" },
            { name: "医生管理", url: "#/app/business/dtrmanagement", state: "app.business.dtrmanagement" },
            { name: "厂商管理", url: "#/app/business/ftymanagement", state: "app.business.ftymanagement" },
            { name: "仓库管理", url: "#/app/business/whmanagement", state: "app.business.whmanagement" },
            { name: "品牌管理", url: "#/app/business/brandmanagement", state: "app.business.brandmanagement" },
            { name: "产品线管理", url: "#/app/business/productlinemanagement", state: "app.business.productlinemanagement" },
            //{ name: "仓库路由管理", url: "#/app/business/whroutmanagement", state: "app.business.whroutmanagement" },
            { name: "代理产品管理", url: "#/app/business/productmanagement", state: "app.business.productmanagement" },
            { name: "事件通知管理", url: "#/app/business/dlmanagementnotice", state: "app.business.dlmanagementnotice" },
        ]
    });
    service.push({
        name: "权限管理", url: "", state: "app.comp", icon: "fa-folder-open",
        detail: [
            { name: "用户列表", url: "#/app/comp/user/list", state: "app.comp.user.list" },
            { name: "角色列表", url: "#/app/comp/role/list", state: "app.comp.role.list" },
            { name: "菜单列表", url: "#/app/comp/menu/list", state: "app.comp.menu.list" },
            { name: "群组列表", url: "#/app/comp/group/list", state: "app.comp.group.list" }
        ]
    });
    service.push({
        name: "基础信息", url: "", state: "app.basis", icon: "fa-desktop", detail: [
            { name: "国家信息", url: "#/app/base/country", state: "app.basis.country" },
            { name: "行政区域", url: "#/app/base/admd", state: "app.basis.admd" },
            { name: "币种信息", url: "#/app/base/currency", state: "app.basis.currency" },
            { name: "数据字典", url: "#/app/base/dictionary", state: "app.basis.dictionary" },
            { name: "事件编码", url: "#/app/base/event", state: "app.basis.event" },
            { name: "语言管理", url: "#/app/base/lang", state: "app.basis.lang" },
            { name: "登录日志", url: "#/app/base/journal", state: "app.basis.journal" },
        ]
    });
    return service;
});