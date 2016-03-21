﻿var Oms = angular.module('OmsApp', []);

Oms.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>页面配置信息</summary>
    $stateProvider
         .state("app.oms", {
             /// <summary>手术订单信息管理</summary>
             url: "/oms",
             cache: false,
             template: "<div ui-view></div>",
             abstract: true
         })
         .state("app.oms.order", {
             /// <summary>手术订单信息管理</summary>
             url: "/order",
             cache: false,
             template: "<div ui-view></div>",
             controller: "SurgeryController",
             abstract: true
         })
        .state("app.oms.stock", {
            /// <summary>备货订单管理</summary>
            url: "/stock",
            cache: false,
            template: "<div ui-view></div>",
            controller: "StockController",
            abstract: true,
            loadJs: [
               "Content/script/app/OmsApp/Order/Stock/JS_View.js"
            ],
            resolve: app.resolve
        });
});

Oms.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>手术订单列表管理</summary>
    $stateProvider
        .state("app.oms.order.complex", {
            /// <summary>综合查询</summary>
            url: "/complex",
            cache: false,
            templateUrl: "View/OMS/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "IntegratedListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_IntegratedList.js"],
            resolve: app.resolve
        })
        .state("app.oms.order.orderlist", {
            /// <summary>我的手术订单列表</summary>
            url: "/orderlist",
            cache: false,
            templateUrl: "View/OMS/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "MyOrderListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-MyOrderList.js"],
            resolve: app.resolve
        })
        .state("app.oms.order.draft", {
            /// <summary>草稿订单列表</summary>
            url: "/draft",
            cache: false,
            templateUrl: "View/OMS/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "MyDraftListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-MyDraftList.js"],
            resolve: app.resolve
        })
        .state("app.oms.order.approval", {
            /// <summary>手术订单审批列表</summary>
            url: "/approval",
            cache: false,
            templateUrl: "View/OMS/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "ApprovalListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-ApprovalList.js"],
            resolve: app.resolve
        })
        .state("app.oms.order.deal", {
            /// <summary>订单处理列表</summary>
            url: "/deal",
            cache: false,
            templateUrl: "View/OMS/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "DealWithListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-DealWithList.js"],
            resolve: app.resolve
        })
        .state("app.oms.order.stock", {
            /// <summary>追加备货信息</summary>
            url: "/stock",
            cache: false,
            templateUrl: "View/OMS/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "AppendListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-AppendList.js"],
            resolve: app.resolve
        })
        .state("app.oms.order.sign", {
            /// <summary>签收单信息</summary>
            url: "/sign",
            cache: false,
            templateUrl: "View/OMS/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "SignListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-SignList.js"],
            resolve: app.resolve
        })
        .state("app.oms.order.apply", {
            /// <summary>返库申请</summary>
            url: "/apply",
            cache: false,
            templateUrl: "View/OMS/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "ApplyListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-ApplyList.js"],
            resolve: app.resolve
        })
        .state("app.oms.order.back", {
            /// <summary>返库处理</summary>
            url: "/back",
            cache: false,
            templateUrl: "View/OMS/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "BackListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-BackList.js"],
            resolve: app.resolve
        })
        .state("app.oms.order.feedback", {
            /// <summary>反馈单草稿</summary>
            url: "/feedback",
            cache: false,
            templateUrl: "View/OMS/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "FeedbackListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-FeedbackList.js"],
            resolve: app.resolve
        })
        .state("app.oms.order.delivery", {
            /// <summary>出库单查询</summary>
            url: "/delivery",
            cache: false,
            templateUrl: "View/OMS/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            resolve: app.resolve
        });
});
Oms.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>手术订单订单管理</summary>
    $stateProvider
       .state("app.oms.order.single", {
           /// <summary>手术下单</summary>
           url: "/single/:sono",
           cache: false,
           templateUrl: "View/OMS/Order/Surgery/Single.html?data=" + Timestamp,
           controller: "SingleController"
       })
        .state("app.oms.order.view", {
            /// <summary>手术订单视图</summary>
            url: "/view/:sono",
            cache: false,
            views: {
                "": {
                    templateUrl: "View/OMS/Order/Surgery/View.html?data=" + Timestamp,
                    controller: "OrderViewController",
                },
                "Original@app.order.view": {
                    templateUrl: "View/OMS/Order/Surgery/View/SingleView.html?data=" + Timestamp,
                    controller: "OriginalController",
                },
                "Accurate@app.order.view": {
                    templateUrl: "View/OMS/Order/Surgery/View/AccurateView.html?data=" + Timestamp,
                    controller: "AccurateController",
                },
                "Library@app.order.view": {
                    templateUrl: "View/OMS/Order/Surgery/View/LibraryView.html?data=" + Timestamp,
                    controller: "LibraryController",
                },
                "Feedback@app.order.view": {
                    templateUrl: "View/OMS/Order/Surgery/View/FeedbackView.html?data=" + Timestamp,
                    controller: "FeedbackViewController",
                },
                "Event@app.order.view": {
                    templateUrl: "View/OMS/Order/Surgery/View/EventView.html?data=" + Timestamp
                }
            },
            authenticate: true,
            viewAuth: true

        })
        .state("app.oms.order.dealpage", {
            /// <summary>手术订单处理</summary>
            url: "/dealpage/:sono",
            cache: false,
            views: {
                "": {
                    templateUrl: "View/OMS/Order/Surgery/Dealwith.html?data=" + Timestamp,
                    controller: "OrderViewController"
                },
                "Original@app.order.dealpage": {
                    templateUrl: "View/OMS/Order/Surgery/View/SingleView.html?data=" + Timestamp,
                    controller: "OriginalController"
                }
            },
            authenticate: true,
            viewAuth: true
        })
        .state("app.oms.order.additional", {
            /// <summary>物料追加</summary>
            url: "/additional/:sono",
            cache: false,
            views: {
                "": {
                    templateUrl: "View/OMS/Order/Surgery/Additional.html?data=" + Timestamp,
                    controller: "OrderViewController"
                },
                "Original@app.order.additional": {
                    templateUrl: "View/OMS/Order/Surgery/View/SingleView.html?data=" + Timestamp,
                    controller: "OriginalController"
                },
                "Accurate@app.order.additional": {
                    templateUrl: "View/OMS/Order/Surgery/View/AccurateView.html?data=" + Timestamp,
                    controller: "AccurateController",
                },
                "Library@app.order.additional": {
                    templateUrl: "View/OMS/Order/Surgery/View/LibraryView.html?data=" + Timestamp,
                    controller: "LibraryController",
                }
            },
            authenticate: true,
            viewAuth: true
        })
        .state("app.oms.order.addevent", {
            /// <summary>物料追加</summary>
            url: "/addevent/:sono",
            cache: false,
            views: {
                "": {
                    templateUrl: "View/OMS/Order/Surgery/AddEvent.html?data=" + Timestamp,
                    controller: "OrderViewController"
                },
                "Original@app.order.addevent": {
                    templateUrl: "View/OMS/Order/Surgery/View/SingleView.html?data=" + Timestamp,
                    controller: "OriginalController"
                },
                "Accurate@app.order.addevent": {
                    templateUrl: "View/OMS/Order/Surgery/View/AccurateView.html?data=" + Timestamp,
                    controller: "AccurateController",
                },
                "Library@app.order.addevent": {
                    templateUrl: "View/OMS/Order/Surgery/View/LibraryView.html?data=" + Timestamp,
                    controller: "LibraryController",
                }
            },
            authenticate: true,
            viewAuth: true
        })
        .state("app.oms.order.fback", {
            /// <summary>物料追加</summary>
            url: "/fback/:sono",
            cache: false,
            views: {
                "": {
                    templateUrl: "View/OMS/Order/Surgery/Feedback.html?data=" + Timestamp,
                    controller: "OrderViewController"
                },
                "Original@app.order.fback": {
                    templateUrl: "View/OMS/Order/Surgery/View/SingleView.html?data=" + Timestamp,
                    controller: "OriginalController"
                },
                "Accurate@app.order.fback": {
                    templateUrl: "View/OMS/Order/Surgery/View/AccurateView.html?data=" + Timestamp,
                    controller: "AccurateController",
                },
                "Library@app.order.fback": {
                    templateUrl: "View/OMS/Order/Surgery/View/LibraryView.html?data=" + Timestamp,
                    controller: "LibraryController"
                }
            },
            authenticate: true,
            viewAuth: true
        })

});

Oms.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>备货订单列表管理</summary>
    $stateProvider
        .state("app.oms.stock.list", {
            /// <summary>备货订单列表</summary>
            url: "/list",
            cache: false,
            templateUrl: "View/OMS/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "MyStockListController",
            loadJs: ["Content/script/app/OmsApp/Order/Stock/List/JS_Integrated-MyStockList.js"],
            resolve: app.resolve
        })
        .state("app.oms.stock.draft", {
            /// <summary>草稿订单列表</summary>
            url: "/draft",
            cache: false,
            templateUrl: "View/OMS/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "StockMyDraftListController",
            loadJs: ["Content/script/app/OmsApp/Order/Stock/List/JS_Integrated-MyDraftList.js"],
            resolve: app.resolve
        })
        .state("app.oms.stock.approval", {
            /// <summary>备货单审批</summary>
            url: "/approval",
            cache: false,
            templateUrl: "View/OMS/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "StockApprovalListController",
            loadJs: ["Content/script/app/OmsApp/Order/Stock/List/JS_Integrated-ApprovalList.js"],
            resolve: app.resolve
        })
        .state("app.oms.stock.deal", {
            /// <summary>备货订单处理</summary>
            url: "/deal",
            cache: false,
            templateUrl: "View/OMS/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "StockDealWithListController",
            loadJs: ["Content/script/app/OmsApp/Order/Stock/List/JS_Integrated-DealWithList.js"],
            resolve: app.resolve
        })
        .state("app.oms.stock.sign", {
            /// <summary>备货订单签收管理</summary>
            url: "/sign",
            cache: false,
            templateUrl: "View/OMS/rder/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "StockSignListController",
            loadJs: ["Content/script/app/OmsApp/Order/Stock/List/JS_Integrated-SignList.js"],
            resolve: app.resolve
        })
        .state("app.oms.stock.complex", {
            /// <summary>备货订单综合查询</summary>
            url: "/complex",
            cache: false,
            templateUrl: "View/OMS/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "StockIntegratedListController",
            loadJs: ["Content/script/app/OmsApp/Order/Stock/List/JS_IntegratedList.js"],
            resolve: app.resolve
        })
        .state("app.oms.stock.delivery", {
            /// <summary>备货订单出库单查询</summary>
            url: "/delivery",
            cache: false,
            templateUrl: "View/OMS/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            resolve: app.resolve
        })
});

Oms.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>备货订单管理</summary>
    $stateProvider
       .state("app.oms.stock.single", {
           /// <summary>备货下单</summary>
           url: "/single/:sono",
           cache: false,
           templateUrl: "View/OMS/Order/Stock/Single.html?data=" + Timestamp,
           controller: "StockSingleController"
       })
        .state("app.oms.stock.view", {
            /// <summary>备货订单视图</summary>
            url: "/view/:sono",
            cache: false,
            views: {
                "": {
                    templateUrl: "View/OMS/Order/Stock/View.html?data=" + Timestamp,
                    controller: "StockViewController",
                },
                "Original@app.stock.view": {
                    templateUrl: "View/OMS/Order/Stock/View/SingleView.html?data=" + Timestamp,
                    controller: "StockOriginalController",
                },
                "Accurate@app.stock.view": {
                    templateUrl: "View/Order/Stock/View/AccurateView.html?data=" + Timestamp,
                    controller: "StockAccurateController",
                },
                "Library@app.stock.view": {
                    templateUrl: "View/OMS/Order/Stock/View/LibraryView.html?data=" + Timestamp,
                    controller: "StockLibraryController",
                },
                "Event@app.stock.view": {
                    templateUrl: "View/OMS/Order/Stock/View/EventView.html?data=" + Timestamp
                }
            },
            authenticate: true,
            viewAuth: true
        })
        .state("app.oms.stock.dealpage", {
            /// <summary>备货订单处理</summary>
            url: "/dealpage/:sono",
            cache: false,
            views: {
                "": {
                    templateUrl: "View/OMS/Order/Stock/Dealwith.html?data=" + Timestamp,
                    controller: "StockViewController"
                },
                "Original@app.stock.dealpage": {
                    templateUrl: "View/OMS/Order/Stock/View/SingleView.html?data=" + Timestamp,
                    controller: "StockOriginalController"
                }
            },
            authenticate: true,
            viewAuth: true
        })
});

