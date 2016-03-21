
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>备货订单列表管理</summary>
    $stateProvider
        .state("app.stock.list", {
            /// <summary>备货订单列表</summary>
            url: "/list",
            cache: false,
            templateUrl: "View/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "MyStockListController",
            loadJs: ["Content/script/app/OmsApp/Order/Stock/List/JS_Integrated-MyStockList.js"],
            resolve: app.resolve
        })
        .state("app.stock.draft", {
            /// <summary>草稿订单列表</summary>
            url: "/draft",
            cache: false,
            templateUrl: "View/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "StockMyDraftListController",
            loadJs: ["Content/script/app/OmsApp/Order/Stock/List/JS_Integrated-MyDraftList.js"],
            resolve: app.resolve
        })
        .state("app.stock.approval", {
            /// <summary>备货单审批</summary>
            url: "/approval",
            cache: false,
            templateUrl: "View/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "StockApprovalListController",
            loadJs: ["Content/script/app/OmsApp/Order/Stock/List/JS_Integrated-ApprovalList.js"],
            resolve: app.resolve
        })
        .state("app.stock.deal", {
            /// <summary>备货订单处理</summary>
            url: "/deal",
            cache: false,
            templateUrl: "View/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "StockDealWithListController",
            loadJs: ["Content/script/app/OmsApp/Order/Stock/List/JS_Integrated-DealWithList.js"],
            resolve: app.resolve
        })
        .state("app.stock.sign", {
            /// <summary>备货订单签收管理</summary>
            url: "/sign",
            cache: false,
            templateUrl: "View/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "StockSignListController",
            loadJs: ["Content/script/app/OmsApp/Order/Stock/List/JS_Integrated-SignList.js"],
            resolve: app.resolve
        })
        .state("app.stock.complex", {
            /// <summary>备货订单综合查询</summary>
            url: "/complex",
            cache: false,
            templateUrl: "View/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "StockIntegratedListController",
            loadJs: ["Content/script/app/OmsApp/Order/Stock/List/JS_IntegratedList.js"],
            resolve: app.resolve
        })
        .state("app.stock.delivery", {
            /// <summary>备货订单出库单查询</summary>
            url: "/delivery",
            cache: false,
            templateUrl: "View/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            resolve: app.resolve
        })
});

app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>备货订单管理</summary>
    $stateProvider
       .state("app.stock.single", {
           /// <summary>备货下单</summary>
           url: "/single/:sono",
           cache: false,
           templateUrl: "View/Order/Stock/Single.html?data=" + Timestamp,
           controller: "StockSingleController"
       })
        .state("app.stock.view", {
            /// <summary>备货订单视图</summary>
            url: "/view/:sono",
            cache: false,
            views: {
                "": {
                    templateUrl: "View/Order/Stock/View.html?data=" + Timestamp,
                    controller: "StockViewController",
                },
                "Original@app.stock.view": {
                    templateUrl: "View/Order/Stock/View/SingleView.html?data=" + Timestamp,
                    controller: "StockOriginalController",
                },
                "Accurate@app.stock.view": {
                    templateUrl: "View/Order/Stock/View/AccurateView.html?data=" + Timestamp,
                    controller: "StockAccurateController",
                },
                "Library@app.stock.view": {
                    templateUrl: "View/Order/Stock/View/LibraryView.html?data=" + Timestamp,
                    controller: "StockLibraryController",
                },
                "Event@app.stock.view": {
                    templateUrl: "View/Order/Stock/View/EventView.html?data=" + Timestamp
                }
            },
            authenticate: true,
            viewAuth: true
        })
        .state("app.stock.dealpage", {
            /// <summary>备货订单处理</summary>
            url: "/dealpage/:sono",
            cache: false,
            views: {
                "": {
                    templateUrl: "View/Order/Stock/Dealwith.html?data=" + Timestamp,
                    controller: "StockViewController"
                },
                "Original@app.stock.dealpage": {
                    templateUrl: "View/Order/Stock/View/SingleView.html?data=" + Timestamp,
                    controller: "StockOriginalController"
                }
            },
            authenticate: true,
            viewAuth: true
        })
});