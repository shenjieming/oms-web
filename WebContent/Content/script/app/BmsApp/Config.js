/// <reference path="../../lib/angular-1.2.20/angular.min.js" />

var BmsApp = angular.module('BmsApp', ["BMSApiService"]);
BmsApp
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        $stateProvider
             .state("app.bms", {
                 /// <summary>票据管理模板</summary>
                 url: "/bms",
                 cache: false,
                 template: "<div ui-view></div>",
                 abstract: true,
                 loadJs: [
                     "Content/script/app/BmsApp/BillController/JS_BillListController.js",
                     "Content/script/app/BmsApp/BillController/JS_BillOperatController.js"
                 ],
                 resolve: app.resolve
             })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>计费单列表管理部分</summary>
        $stateProvider
            .state("app.bms.bill", {
                /// <summary>计费管理信息</summary>
                url: "/bill",
                template: "<div ui-view></div>",
                abstract: true,
                controller: "BillController"
            })
            .state("app.bms.bill.complex", {
                /// <summary>计费单综合查询</summary>
                url: "/complex",
                cache: false,
                templateUrl: "View/BMS/Bill/View/BillList.html?data=" + Timestamp,
                controller: "BillComplexListController"
            })
            .state("app.bms.bill.list", {
                /// <summary>我的计费单列表</summary>
                url: "/list",
                cache: false,
                templateUrl: "View/BMS/Bill/View/BillList.html?data=" + Timestamp,
                controller: "BillListController"
            })
            .state("app.bms.bill.pendlist", {
                /// <summary>待计费订单列表</summary>
                url: "/pendlist",
                cache: false,
                templateUrl: "View/BMS/Bill/View/BillList.html?data=" + Timestamp,
                controller: "BillPendListController"
            })
            .state("app.bms.bill.already", {
                /// <summary>已计费计费单列表</summary>
                url: "/alreadylist",
                cache: false,
                templateUrl: "View/BMS/Bill/View/BillList.html?data=" + Timestamp,
                controller: "BillAlreadyListController"
            })
            .state("app.bms.bill.approval", {
                /// <summary>待审批计费单列表</summary>
                url: "/approvallist",
                cache: false,
                templateUrl: "View/BMS/Bill/View/BillList.html?data=" + Timestamp,
                controller: "BillApprovalListController"
            })
            .state("app.bms.bill.approveded", {
                /// <summary>已审批计费单列表</summary>
                url: "/approvaledlist",
                cache: false,
                templateUrl: "View/BMS/Bill/View/BillList.html?data=" + Timestamp,
                controller: "BillApprovaledListController"
            })
            .state("app.bms.bill.posting", {
                /// <summary>计费单已对账列表</summary>
                url: "/postinglist",
                cache: false,
                templateUrl: "View/BMS/Bill/View/BillList.html?data=" + Timestamp,
                controller: "BillPostingListController"
            })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>计费单操作部分页面</summary>
        $stateProvider
            .state("app.bms.bill.detail", {
                /// <summary>订单计费管理</summary>
                url: "/detail/:hOFNNo",
                cache: false,
                templateUrl: "View/BMS/Bill/Operat/BillDetail.html?data=" + Timestamp,
                controller: "BillDetailController"
            })
            .state("app.bms.bill.view", {
                /// <summary>计费单视图管理</summary>
                url: "/view/:hOFNNo",
                cache: false,
                templateUrl: "View/BMS/Bill/View/BillView.html?data=" + Timestamp,
                controller: "BillViewController"
            })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        $stateProvider
            .state("app.bms.rec", {  /// <summary>对账管理信息</summary>
                url: "/rec",
                cache: false,
                template: "<div ui-view></div>",
                abstract: true
            })
             .state("app.bms.rec.complex", {
                 /// <summary>对账单综合查询</summary>
                 url: "/complex",
                 cache: false,
                 templateUrl: "" + Timestamp,
                 controller: "RecComplexListController"
             })
            .state("app.bms.rec.list", {
                /// <summary>我的对账单列表</summary>
                url: "/list",
                cache: false,
                templateUrl: "" + Timestamp,
                controller: "RecListController"
            })
            .state("app.bms.rec.pendlist", {
                /// <summary>待对账订单列表</summary>
                url: "/pendlist",
                cache: false,
                templateUrl: "" + Timestamp,
                controller: "RecPendListController"
            })
            .state("app.bms.rec.already", {
                /// <summary>已对账单列表</summary>
                url: "/alreadylist",
                cache: false,
                templateUrl: "" + Timestamp,
                controller: "RecAlreadyListController"
            })
            .state("app.bms.rec.approval", {
                /// <summary>待审批对账单列表</summary>
                url: "/approvallist",
                cache: false,
                templateUrl: "" + Timestamp,
                controller: "RecApprovalListController"
            })
            .state("app.bms.rec.approveded", {
                /// <summary>已审批对账单列表</summary>
                url: "/approvaledlist",
                cache: false,
                templateUrl: "" + Timestamp,
                controller: "RecApprovaledListController"
            })
            .state("app.bms.rec.posting", {
                /// <summary>对账单已开票列表</summary>
                url: "/postinglist",
                cache: false,
                templateUrl: "" + Timestamp,
                controller: "RecPostingListController"
            })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>对账单管理</summary>
        $stateProvider
            .state("app.bms.rec.detail", {
                /// <summary>对账单管理信息</summary>
                url: "/detail",
                cache: false,
                templateUrl: "" + Timestamp,
                controller: "RecDetailController"
            })
            .state("app.bms.rec.view", {
                /// <summary>对账单管理视图</summary>
                url: "/view",
                cache: false,
                templateUrl: "" + Timestamp,
                controller: "RecViewController"
            })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        $stateProvider
            .state("app.bms.invoice", {  /// <summary>发票管理信息</summary>
                url: "/invoice",
                cache: false,
                template: "<div ui-view></div>",
                abstract: true
            })
    })
    .factory("$BmsMenuService", function () {
        /// <summary>BMS系统菜单服务</summary>
        var service = new Array();
        service.push({
            name: "订单计费管理", url: "", state: "app.bms.bill", icon: "fa-laptop", order: 3,
            detail: [
                { name: "综合计费单查询", url: "#/app/bms/bill/complex", state: "app.bms.bill.complex" },
                { name: "我的计费单", url: "#/app/bms/bill/list", state: "app.bms.bill.list" },
                { name: "待审批计费", url: "#/app/bms/bill/approval", state: "app.bms.bill.approval" },
                { name: "已审批计费", url: "#/app/bms/bill/approveded", state: "app.bms.bill.approveded" },
                { name: "已对账计费", url: "#/app/bms/bill/posting", state: "app.bms.bill.posting" }
            ]
        });

        return service;
    })