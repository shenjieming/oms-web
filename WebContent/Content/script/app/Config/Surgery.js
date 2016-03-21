
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>手术订单列表管理</summary>
    $stateProvider
        .state("app.order.complex", {
            /// <summary>综合查询</summary>
            url: "/complex",
            cache: false,
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "IntegratedListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_IntegratedList.js"],
            resolve: app.resolve
        })
        .state("app.order.orderlist", {
            /// <summary>我的手术订单列表</summary>
            url: "/orderlist",
            cache: false,
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "MyOrderListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-MyOrderList.js"],
            resolve: app.resolve
        })
        .state("app.order.draft", {
            /// <summary>草稿订单列表</summary>
            url: "/draft",
            cache: false,
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "MyDraftListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-MyDraftList.js"],
            resolve: app.resolve
        })
        .state("app.order.approval", {
            /// <summary>手术订单审批列表</summary>
            url: "/approval",
            cache: false,
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "ApprovalListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-ApprovalList.js"],
            resolve: app.resolve
        })
        .state("app.order.deal", {
            /// <summary>订单处理列表</summary>
            url: "/deal",
            cache: false,
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "DealWithListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-DealWithList.js"],
            resolve: app.resolve
        })
        .state("app.order.stock", {
            /// <summary>追加备货信息</summary>
            url: "/stock",
            cache: false,
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "AppendListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-AppendList.js"],
            resolve: app.resolve
        })
        .state("app.order.sign", {
            /// <summary>签收单信息</summary>
            url: "/sign",
            cache: false,
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "SignListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-SignList.js"],
            resolve: app.resolve
        })
        .state("app.order.apply", {
            /// <summary>返库申请</summary>
            url: "/apply",
            cache: false,
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "ApplyListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-ApplyList.js"],
            resolve: app.resolve
        })
        .state("app.order.back", {
            /// <summary>返库处理</summary>
            url: "/back",
            cache: false,
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "BackListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-BackList.js"],
            resolve: app.resolve
        })
        .state("app.order.feedback", {
            /// <summary>反馈单草稿</summary>
            url: "/feedback",
            cache: false,
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "FeedbackListController",
            loadJs: ["Content/script/app/OmsApp/Order/Surgery/List/JS_Integrated-FeedbackList.js"],
            resolve: app.resolve
        })
        .state("app.order.delivery", {
            /// <summary>出库单查询</summary>
            url: "/delivery",
            cache: false,
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            resolve: app.resolve
        });
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>手术订单订单管理</summary>
    $stateProvider
       .state("app.order.single", {
           /// <summary>手术下单</summary>
           url: "/single/:sono",
           cache: false,
           templateUrl: "View/Order/Surgery/Single.html?data=" + Timestamp,
           controller: "SingleController"
       })
        .state("app.order.view", {
            /// <summary>手术订单视图</summary>
            url: "/view/:sono",
            cache: false,
            views: {
                "": {
                    templateUrl: "View/Order/Surgery/View.html?data=" + Timestamp,
                    controller: "OrderViewController",
                },
                "Original@app.order.view": {
                    templateUrl: "View/Order/Surgery/View/SingleView.html?data=" + Timestamp,
                    controller: "OriginalController",
                },
                "Accurate@app.order.view": {
                    templateUrl: "View/Order/Surgery/View/AccurateView.html?data=" + Timestamp,
                    controller: "AccurateController",
                },
                "Library@app.order.view": {
                    templateUrl: "View/Order/Surgery/View/LibraryView.html?data=" + Timestamp,
                    controller: "LibraryController",
                },
                "Feedback@app.order.view": {
                    templateUrl: "View/Order/Surgery/View/FeedbackView.html?data=" + Timestamp,
                    controller: "FeedbackViewController",
                },
                "Event@app.order.view": {
                    templateUrl: "View/Order/Surgery/View/EventView.html?data=" + Timestamp
                }
            },
            authenticate: true,
            viewAuth: true

        })
        .state("app.order.dealpage", {
            /// <summary>手术订单处理</summary>
            url: "/dealpage/:sono",
            cache: false,
            views: {
                "": {
                    templateUrl: "View/Order/Surgery/Dealwith.html?data=" + Timestamp,
                    controller: "OrderViewController"
                },
                "Original@app.order.dealpage": {
                    templateUrl: "View/Order/Surgery/View/SingleView.html?data=" + Timestamp,
                    controller: "OriginalController"
                }
            },
            authenticate: true,
            viewAuth: true
        })
        .state("app.order.additional", {
            /// <summary>物料追加</summary>
            url: "/additional/:sono",
            cache: false,
            views: {
                "": {
                    templateUrl: "View/Order/Surgery/Additional.html?data=" + Timestamp,
                    controller: "OrderViewController"
                },
                "Original@app.order.additional": {
                    templateUrl: "View/Order/Surgery/View/SingleView.html?data=" + Timestamp,
                    controller: "OriginalController"
                },
                "Accurate@app.order.additional": {
                    templateUrl: "View/Order/Surgery/View/AccurateView.html?data=" + Timestamp,
                    controller: "AccurateController",
                },
                "Library@app.order.additional": {
                    templateUrl: "View/Order/Surgery/View/LibraryView.html?data=" + Timestamp,
                    controller: "LibraryController",
                }
            },
            authenticate: true,
            viewAuth: true
        })
        .state("app.order.addevent", {
            /// <summary>物料追加</summary>
            url: "/addevent/:sono",
            cache: false,
            views: {
                "": {
                    templateUrl: "View/Order/Surgery/AddEvent.html?data=" + Timestamp,
                    controller: "OrderViewController"
                },
                "Original@app.order.addevent": {
                    templateUrl: "View/Order/Surgery/View/SingleView.html?data=" + Timestamp,
                    controller: "OriginalController"
                },
                "Accurate@app.order.addevent": {
                    templateUrl: "View/Order/Surgery/View/AccurateView.html?data=" + Timestamp,
                    controller: "AccurateController",
                },
                "Library@app.order.addevent": {
                    templateUrl: "View/Order/Surgery/View/LibraryView.html?data=" + Timestamp,
                    controller: "LibraryController",
                }
            },
            authenticate: true,
            viewAuth: true
        })
        .state("app.order.fback", {
            /// <summary>物料追加</summary>
            url: "/fback/:sono",
            cache: false,
            views: {
                "": {
                    templateUrl: "View/Order/Surgery/Feedback.html?data=" + Timestamp,
                    controller: "OrderViewController"
                },
                "Original@app.order.fback": {
                    templateUrl: "View/Order/Surgery/View/SingleView.html?data=" + Timestamp,
                    controller: "OriginalController"
                },
                "Accurate@app.order.fback": {
                    templateUrl: "View/Order/Surgery/View/AccurateView.html?data=" + Timestamp,
                    controller: "AccurateController",
                },
                "Library@app.order.fback": {
                    templateUrl: "View/Order/Surgery/View/LibraryView.html?data=" + Timestamp,
                    controller: "LibraryController"
                }
            },
            authenticate: true,
            viewAuth: true
        })

});