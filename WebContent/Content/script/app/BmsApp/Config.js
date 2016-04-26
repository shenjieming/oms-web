/// <reference path="../../lib/angular-1.2.20/angular.min.js" />

var BmsApp = angular.module('BmsApp', ["BMSApiService"]);
BmsApp
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        $stateProvider
             .state("app.bms", {
                 /// <summary>票据管理模板</summary>
                 url: "/bms", cache: false, template: "<div ui-view></div>", abstract: true, resolve: app.resolve, loadJs: ["Content/script/app/BmsApp/BillController/JS_BillListController.js", "Content/script/app/BmsApp/ReconciliationController/JS_ReconciliationListController.js", "Content/script/app/BmsApp/InvoiceController/JS_InvoiceListController.js", ]
             })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>计费单列表管理部分</summary>
        $stateProvider
            .state("app.bms.bill", {
                /// <summary>计费管理信息</summary>
                url: "/bill", template: "<div ui-view></div>", abstract: true, controller: "BillController",resolve:app.resolve, loadJs: ["Content/script/app/BmsApp/BillController/JS_BillListController.js"]
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
                url: "/detail/:hOFNNo/:sONo", cache: false,    views: {     "": {    templateUrl: "View/BMS/Bill/Operat/BillDetail.html?data=" + Timestamp,   controller: "BillInfoController",   },    "Accurate@app.bms.bill.detail": {    templateUrl: "View/OMS/Order/Surgery/View/AccurateView.html?data=" + Timestamp,   controller: "AccurateController",    }    },    loadJs: ["Content/script/app/BmsApp/BillController/OperatController/JS_BillDetail.js"], resolve: app.resolve
            })
            .state("app.bms.bill.view", {
                /// <summary>计费单视图管理</summary>
                url: "/view/:hOFNNo/:sONo",   cache: false,    views: {    "": {  templateUrl: "View/BMS/Bill/View/BillView.html?data=" + Timestamp,    controller: "BillInfoController",    },    "Accurate@app.bms.bill.view": {    templateUrl: "View/OMS/Order/Surgery/View/AccurateView.html?data=" + Timestamp,   controller: "AccurateController",     }    },   loadJs: ["Content/script/app/BmsApp/BillController/OperatController/JS_BillView.js"], resolve: app.resolve
            })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        $stateProvider
            .state("app.bms.rec", {  /// <summary>对账管理信息</summary>
                url: "/rec", cache: false, template: "<div ui-view></div>", abstract: true, controller: "ReconciliationController", resolve: app.resolve, loadJs: [ "Content/script/app/BmsApp/ReconciliationController/JS_ReconciliationListController.js" ]
            })
             .state("app.bms.rec.complex", {
                 /// <summary>对账单综合查询</summary>
                 url: "/complex", cache: false, templateUrl: "View/BMS/Reconciliation/View/ReconciliationList.html?data=" + Timestamp, resolve: app.resolve, loadJs: ["Content/script/app/BmsApp/ReconciliationController/ListController/JS_ReconciliationComplex.js"], controller: "RecComplexListController"
             })
            .state("app.bms.rec.list", {
                /// <summary>我的对账单列表</summary>
                url: "/list", cache: false, templateUrl: "View/BMS/Reconciliation/View/ReconciliationList.html?data=" + Timestamp, resolve: app.resolve, loadJs: ["Content/script/app/BmsApp/ReconciliationController/ListController/JS_MyReconciliation.js"], controller: "RecListController"
            })
            .state("app.bms.rec.notapproval", {
                /// <summary>未审批对账单</summary>
                url: "/notapproval", cache: false, templateUrl: "View/BMS/Reconciliation/View/ReconciliationList.html?data=" + Timestamp, resolve: app.resolve, loadJs: ["Content/script/app/BmsApp/ReconciliationController/ListController/JS_ApprovalReconciliation.js"], controller: "RecNotApprovalListController"
            })
            .state("app.bms.rec.approval", {
                /// <summary>待审批对账单列表</summary>
                url: "/approval", cache: false, templateUrl: "View/BMS/Reconciliation/View/ReconciliationList.html?data=" + Timestamp, resolve: app.resolve, loadJs: ["Content/script/app/BmsApp/ReconciliationController/ListController/JS_ApprovalReconciliation.js"], controller: "RecApprovalListController"
            })
            .state("app.bms.rec.approveded", {
                /// <summary>已审批对账单列表</summary>
                url: "/approveded", cache: false, templateUrl: "View/BMS/Reconciliation/View/ReconciliationList.html?data=" + Timestamp, resolve: app.resolve, loadJs: ["Content/script/app/BmsApp/ReconciliationController/ListController/JS_ApprovaledReconciliation.js"], controller: "RecApprovaledListController"
            })
            .state("app.bms.rec.already", {
                /// <summary>已开票单列表</summary>
                url: "/already", cache: false, templateUrl: "View/BMS/Reconciliation/View/ReconciliationList.html?data=" + Timestamp, resolve: app.resolve, loadJs: ["Content/script/app/BmsApp/ReconciliationController/ListController/JS_AlreadyReconciliation.js"], controller: "RecAlreadyListController"
            })

            .state("app.bms.rec.posting", {
                /// <summary>对账单已开票列表</summary>
                url: "/postinglist", cache: false, templateUrl: "View/BMS/Reconciliation/View/ReconciliationList.html?data=" + Timestamp, controller: "RecPostingListController"
            })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>对账单管理</summary>
        $stateProvider
            .state("app.bms.rec.detail", {
                /// <summary>对账单管理信息</summary>
                url: "/detail/:hSOANo",
                cache: false,
                templateUrl: "View/BMS/Reconciliation/Operat/ReconciliationDetail.html?data=" + Timestamp,
                controller: "RecInfoController",
                loadJs: ["Content/script/app/BmsApp/ReconciliationController/OperatController/ReconciliationDetail.js"], resolve: app.resolve
            })
            .state("app.bms.rec.view", {
                /// <summary>对账单管理视图</summary>
                url: "/view",
                cache: false,
                templateUrl: "View/BMS/Reconciliation/View/ReconciliationView.html?data=" + Timestamp,
                controller: "RecInfoController",
                loadJs: ["Content/script/app/BmsApp/ReconciliationController/OperatController/ReconciliationView.js"], resolve: app.resolve
            })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        $stateProvider
            .state("app.bms.invoice", {  /// <summary>发票管理信息</summary>
                url: "/invoice", cache: false, template: "<div ui-view></div>", abstract: true, controller: "InvoiceController", resolve: app.resolve, loadJs: ["Content/script/app/BmsApp/InvoiceController/JS_InvoiceListController.js" ]
            })
            .state("app.bms.invoice.complex", {/// <summary>发票综合查询管理</summary>
                url: "/complex",    cache: false,   templateUrl: "View/BMS/Invoice/View/InvoiceList.html?data=" + Timestamp,    controller: "InvoiceComplexListController",  loadJs: ["Content/script/app/BmsApp/InvoiceController/ListController/JS_InvoiceComplex.js"],   resolve: app.resolve
            })
            .state("app.bms.invoice.list", {/// <summary>我的发票管理</summary>
                url: "/list",  cache: false,  templateUrl: "View/BMS/Invoice/View/InvoiceList.html?data=" + Timestamp,   controller: "InvoiceListController",    loadJs: ["Content/script/app/BmsApp/InvoiceController/ListController/JS_MyInvoice.js"],   resolve: app.resolve
            })
            .state("app.bms.invoice.notapproval", {/// <summary>未审核发票管理</summary>
                url: "/notapproval",     cache: false,   templateUrl: "View/BMS/Invoice/View/InvoiceList.html?data=" + Timestamp,    controller: "InvoiceNotApprovalListController",   loadJs: ["Content/script/app/BmsApp/InvoiceController/ListController/JS_InvoiceApproval.js"],   resolve: app.resolve
            })
            .state("app.bms.invoice.approval", {/// <summary>待审核发票管理</summary>
                url: "/approval",   cache: false,   templateUrl: "View/BMS/Invoice/View/InvoiceList.html?data=" + Timestamp,    controller: "InvoiceApprovalListController",  loadJs: ["Content/script/app/BmsApp/InvoiceController/ListController/JS_InvoiceApproval.js"],   resolve: app.resolve
            })
            .state("app.bms.invoice.approveded", {/// <summary>已审核发票管理</summary>
                url: "/approveded",   cache: false,   templateUrl: "View/BMS/Invoice/View/InvoiceList.html?data=" + Timestamp,  controller: "InvoiceApprovaedlListController",  loadJs: ["Content/script/app/BmsApp/InvoiceController/ListController/JS_InvoiceApprovaled.js"],   resolve: app.resolve
            })
    })
    .factory("$BmsMenuService", function ($BmsBillMenuService, $BmsReconciliationMenuService, $BmsInvoiceMenuService) {
        /// <summary>BMS系统菜单服务</summary>
        var service = new Array();
        //service.push($BmsBillMenuService);
        service.push($BmsReconciliationMenuService);
        //service.push($BmsInvoiceMenuService);
        return service;
    })
    .factory("$BmsBillMenuService", function () {
        /// <summary>BMS系统计费单菜单管理</summary>
        return {
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
        };
    })
    .factory("$BmsReconciliationMenuService", function () {
        /// <summary>BMS系统对账单菜单管理</summary>
        return {
            name: "计费对账管理", url: "", state: "app.bms.rec", icon: "fa-laptop", order: 3,
            detail: [
                { name: "对账单综合查询", url: "#/app/bms/rec/complex", state: "app.bms.rec.complex" },
                { name: "我的对账单", url: "#/app/bms/rec/list", state: "app.bms.rec.list" },
                { name: "未审批对账单", url: "#/app/bms/rec/notapproval", state: "app.bms.rec.notapproval" },
                { name: "待审批对账单", url: "#/app/bms/rec/approval", state: "app.bms.rec.approval" },
                { name: "已审批对账单", url: "#/app/bms/rec/approveded", state: "app.bms.rec.approveded" },
                { name: "已开票对账单", url: "#/app/bms/rec/already", state: "app.bms.rec.already" }
            ]
        };
    })
    .factory("$BmsInvoiceMenuService", function () {
        /// <summary>BMS发票系统菜管理</summary>
        return {
            name: "票据管理", url: "", state: "app.bms.invoice", icon: "fa-laptop", order: 3,
            detail: [
                { name: "票据综合查询", url: "#/app/bms/invoice/complex", state: "app.bms.invoice.complex" },
                { name: "我的发票", url: "#/app/bms/invoice/list", state: "app.bms.invoice.list" },
                { name: "未审批发票", url: "#/app/bms/invoice/notapproval", state: "app.bms.invoice.notapproval" },
                { name: "待审批发票", url: "#/app/bms/invoice/approval", state: "app.bms.invoice.approval" },
                { name: "已审批发票", url: "#/app/bms/invoice/approveded", state: "app.bms.invoice.approveded" }
            ]
        };
    })