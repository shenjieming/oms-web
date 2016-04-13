/// <reference path="../../lib/angular-1.2.20/angular.min.js" />

var BmsApp = angular.module('BmsApp', ["BMSApiService"]);
BmsApp
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        $stateProvider
             .state("app.bms", {
                 /// <summary>票据管理模板</summary>
                 url: "/bms", cache: false, template: "<div ui-view></div>", abstract: true, resolve: app.resolve, loadJs: ["Content/script/app/BmsApp/BillController/JS_BillListController.js"]
             })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>计费单列表管理部分</summary>
        $stateProvider
            .state("app.bms.bill", {
                /// <summary>计费管理信息</summary>
                url: "/bill", template: "<div ui-view></div>", abstract: true, controller: "BillController",
            })
            .state("app.bms.bill.pending", {
                /// <summary>待计费订单列表</summary>
                url: "/pending", cache: false, templateUrl: "View/BMS/Bill/View/PendingBillList.html?data=" + Timestamp, controller: "PendingBillListController", loadJs: ["Content/script/app/BmsApp/BillController/ListController/JS_PendingBillList.js"], resolve: app.resolve
            })
            .state("app.bms.bill.complex", {
                /// <summary>计费单综合查询</summary>
                url: "/complex", cache: false, templateUrl: "View/BMS/Bill/View/BillList.html?data=" + Timestamp, controller: "BillComplexListController", loadJs: ["Content/script/app/BmsApp/BillController/ListController/JS_BillComplex.js"], resolve: app.resolve
            })
            .state("app.bms.bill.list", {
                /// <summary>我的计费单列表</summary>
                url: "/list", cache: false, templateUrl: "View/BMS/Bill/View/BillList.html?data=" + Timestamp, controller: "BillListController", loadJs: ["Content/script/app/BmsApp/BillController/ListController/JS_MyBill.js"], resolve: app.resolve
            })
            .state("app.bms.bill.pendlist", {
                /// <summary>待计费订单列表</summary>
                url: "/pendlist", cache: false, templateUrl: "View/BMS/Bill/View/BillList.html?data=" + Timestamp, controller: "BillPendListController"
            })
            .state("app.bms.bill.already", {
                /// <summary>已计费计费单列表</summary>
                url: "/alreadylist", cache: false, templateUrl: "View/BMS/Bill/View/BillList.html?data=" + Timestamp, controller: "BillAlreadyListController", loadJs: ["Content/script/app/BmsApp/BillController/ListController/JS_BillAlready.js"], resolve: app.resolve
            })
            .state("app.bms.bill.notapproval", {
                /// <summary>未审批计费单列表</summary>
                url: "/notapproval",
                cache: false, templateUrl: "View/BMS/Bill/View/BillList.html?data=" + Timestamp, controller: "BillNotApprovalListController", loadJs: ["Content/script/app/BmsApp/BillController/ListController/JS_BillApproval.js"], resolve: app.resolve
            })
            .state("app.bms.bill.approval", {
                /// <summary>待审批计费单列表</summary>
                url: "/approval",
                cache: false, templateUrl: "View/BMS/Bill/View/BillList.html?data=" + Timestamp, controller: "BillApprovalListController", loadJs: ["Content/script/app/BmsApp/BillController/ListController/JS_BillApproval.js"], resolve: app.resolve
            })
            .state("app.bms.bill.approveded", {
                /// <summary>已审批计费单列表</summary>
                url: "/approveded", cache: false, templateUrl: "View/BMS/Bill/View/BillList.html?data=" + Timestamp, controller: "BillApprovaledListController", loadJs: ["Content/script/app/BmsApp/BillController/ListController/JS_BillApprovaled.js"], resolve: app.resolve
            })
            .state("app.bms.bill.posting", {
                /// <summary>计费单已对账列表</summary>
                url: "/posting", cache: false, templateUrl: "View/BMS/Bill/View/BillList.html?data=" + Timestamp, controller: "BillPostingListController", loadJs: ["Content/script/app/BmsApp/BillController/ListController/JS_BillPosting.js"], resolve: app.resolve
            })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>计费单操作部分页面</summary>
        $stateProvider
            .state("app.bms.bill.detail", {
                /// <summary>订单计费管理</summary>
                url: "/detail/:hOFNNo/:sONo", cache: false,
                views: {
                    "": {
                        templateUrl: "View/BMS/Bill/Operat/BillDetail.html?data=" + Timestamp,
                        controller: "BillInfoController",
                    },
                    "Accurate@app.bms.bill.detail": {
                        templateUrl: "View/OMS/Order/Surgery/View/AccurateView.html?data=" + Timestamp,
                        controller: "AccurateController",
                    }
                },
                loadJs: ["Content/script/app/BmsApp/BillController/OperatController/JS_BillDetail.js"], resolve: app.resolve
            })
            .state("app.bms.bill.view", {
                /// <summary>计费单视图管理</summary>
                url: "/view/:hOFNNo/:sONo",
                cache: false,
                views: {
                    "": {
                        templateUrl: "View/BMS/Bill/View/BillView.html?data=" + Timestamp,
                        controller: "BillInfoController",
                    },
                    "Accurate@app.bms.bill.view": {
                        templateUrl: "View/OMS/Order/Surgery/View/AccurateView.html?data=" + Timestamp,
                        controller: "AccurateController",
                    }
                },
                loadJs: ["Content/script/app/BmsApp/BillController/OperatController/JS_BillView.js"], resolve: app.resolve
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
                url: "/approval",
                cache: false,
                templateUrl: "" + Timestamp,
                controller: "RecApprovalListController"
            })
            .state("app.bms.rec.approveded", {
                /// <summary>已审批对账单列表</summary>
                url: "/approveded",
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
                { name: "待计费订单", url: "#/app/bms/bill/pending", state: "app.bms.bill.pending" },
                { name: "我的计费单", url: "#/app/bms/bill/list", state: "app.bms.bill.list" },
                { name: "未审批计费", url: "#/app/bms/bill/notapproval", state: "app.bms.bill.notapproval" },
                { name: "待审批计费", url: "#/app/bms/bill/approval", state: "app.bms.bill.approval" },
                { name: "已审批计费", url: "#/app/bms/bill/approveded", state: "app.bms.bill.approveded" },
                { name: "已对账计费", url: "#/app/bms/bill/posting", state: "app.bms.bill.posting" }
            ]
        });

        return service;
    })