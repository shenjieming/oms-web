/// <reference path="../../../View/Business/Suite/SuiteEduit.html" />
/// <reference path="User/JS_Information.js" />
/// <reference path="../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../lib/Jquery/jquery-1.11.1.min.js" />
var app = angular.module('omsApp', ["ngRoute", "ui.router", "ngRequire", "ui.bootstrap", "smart-table", "jnDo"]);
var Timestamp = new Date().getTime();
app.run(function ($rootScope, $state, $local, $Api, $MessagService) {
    /// <summary>系统启动事件</summary>
    $rootScope.BASE_URL = ApiPath.Path;
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams, errorType) {
        /// <summary>页面开始进入</summary>
        ///TODO:用户有效性验证
        if (toState.name != "login") {
            var data = $local.getValue("USER");
            if (data) {
                console.log(toState.name + "页面启动");
            } else {
                $MessagService.caveat("用户信息过期，请重新登录..");
                event.preventDefault();
                console.log(toState.name);
                $state.go("login");
            }
        }
    });
})
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>页面配置信息</summary>
    $stateProvider
        .state("app", {
            abstract: true,
            url: "/app",
            views: {
                "": {
                    templateUrl: "View/layout.html?data=" + Timestamp,
                    controller: "masterController"
                }
            }
        })
        .state("app.home", {
            url: "/home",
            templateUrl: "View/Home.html?data=" + Timestamp,
            controller: "HomeController"
        })
        .state("app.my", {
            url: "/my",
            templateUrl: "View/User/Information.html?data=" + Timestamp,
            controller: "InformationController",
            loadJs: ["Content/script/app/User/JS_Information.js"],
            resolve: app.resolve
        })
         .state("app.comp", {
             /// <summary>权限信息管理</summary>
             url: "/comp",
             abstract: true,
             template: "<div ui-view></div>"
         })
         .state("app.order", {
             /// <summary>手术订单信息管理</summary>
             url: "/order",
             template: "<div ui-view></div>",
             controller: "SurgeryController",
             abstract: true
         })
        .state("app.stock", {
            /// <summary>备货订单管理</summary>
            url: "/stock",
            template: "<div ui-view></div>",
            controller: "StockController",
            abstract: true,
            loadJs: [
               "Content/script/app/Order/Stock/JS_View.js"
            ],
            resolve: app.resolve
        })
        .state("app.mybusiness", {
            /// <summary>我的业务信息管理</summary>
            url: "/mybusiness",
            template: "<div ui-view></div>"
        })
        .state("app.business", {
            /// <summary>业务信息管理</summary>
            url: "/business",
            template: "<div ui-view></div>"
        })
        .state("login", {
            url: "/login",
            templateUrl: "View/System/SignIn.html",
            controller: "SignInController",
            loadJs: ["Content/script/app/System/JS_SignIn.js"],
            resolve: app.resolve
        });
    $urlRouterProvider.otherwise("/login");
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>基础信息配置</summary>
    $stateProvider
        .state("app.basis", {
            /// <summary>基础数据维护</summary>
            url: "/base",
            template: "<div ui-view></div>"
        })
        .state("app.basis.admd", {
            /// <summary>行政区域维护</summary>
            url: "/admd",
            templateUrl: "View/Basis/AdmdivisionList.html?data=" + Timestamp,
            controller: "AdmdivisionListController",
            loadJs: ["Content/script/app/Base/JS_AdmdivisionList.js"],
            resolve: app.resolve
        })
        .state("app.basis.country", {
            /// <summary>国家列表维护</summary>
            url: "/country",
            templateUrl: "View/Basis/CountryList.html?data=" + Timestamp,
            controller: "CountryListController",
            loadJs: ["Content/script/app/Base/JS_CountryList.js"],
            resolve: app.resolve
        })
        .state("app.basis.currency", {
            /// <summary>币别列表维护</summary>
            url: "/currency",
            templateUrl: "View/Basis/CurrencyList.html?data=" + Timestamp,
            controller: "CurrencyListController",
            loadJs: ["Content/script/app/Base/JS_CurrencyList.js"],
            resolve: app.resolve
        })
        .state("app.basis.dictionary", {
            /// <summary>数据字典维护</summary>
            url: "/dictionary",
            templateUrl: "View/Basis/DictionaryList.html?data=" + Timestamp,
            controller: "DictionaryListController",
            loadJs: ["Content/script/app/Base/JS_DictionaryList.js"],
            resolve: app.resolve
        })
        .state("app.basis.event", {
            /// <summary>事件编码维护</summary>
            url: "/event",
            templateUrl: "View/Basis/EventCodeList.html?data=" + Timestamp,
            controller: "EventCodeListController",
            loadJs: ["Content/script/app/Base/JS_EventCodeList.js"],
            resolve: app.resolve
        })
        .state("app.basis.lang", {
            /// <summary>语言列表维护</summary>
            url: "/lang",
            templateUrl: "View/Basis/LanguageList.html?data=" + Timestamp,
            controller: "LanguageListController",
            loadJs: ["Content/script/app/Base/JS_LanguageList.js"],
            resolve: app.resolve
        })
         .state("app.basis.journal", {
             /// <summary>用户登录日志查询</summary>
             url: "/journal",
             templateUrl: "View/Basis/journalInfo.html?data=" + Timestamp,
             controller: "JournalInfoController",
             loadJs: ["Content/script/app/Base/JS_JournalInfo.js"],
             resolve: app.resolve
         })
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>群组管理配置</summary>
    $stateProvider
       .state("app.comp.group", {
           url: "/group",
           template: "<div ui-view></div>"
       })
       .state("app.comp.group.list", {
           /// <summary>群组绑定用户</summary>
           url: "/list",
           templateUrl: "View/Group/GroupList.html?data=" + Timestamp,
           controller: "GroupListController",
           loadJs: ["Content/script/app/Group/JS_GroupInfo.js"],
           resolve: app.resolve
       })
       .state("app.comp.group.detail", {
           /// <summary>群组用户详情</summary>
           url: "/detail/:teamCodeId",
           templateUrl: "View/Group/GroupDatail.html?data=" + Timestamp,
           controller: "GroupDetailController",
           loadJs: ["Content/script/app/Group/JS_GroupDetail.js"],
           resolve: app.resolve
       })
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>菜单管理配置</summary>
    $stateProvider
      .state("app.comp.menu", {
          url: "/menu",
          template: "<div ui-view></div>"
      })
      .state("app.comp.menu.list", {
          /// <summary>群组绑定用户</summary>
          url: "/list",
          templateUrl: "View/Menu/MenuList.html?data=" + Timestamp,
          controller: "MenuListController",
          loadJs: ["Content/script/app/Menu/JS_MenuInfo.js"],
          resolve: app.resolve
      })
        .state("app.comp.menu.view", {
            /// <summary>群组绑定用户</summary>
            url: "/view",
            templateUrl: "View/Menu/MenuView.html?data=" + Timestamp
        })
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>角色管理配置</summary>
    $stateProvider
        .state("app.comp.role", {
            url: "/role",
            template: "<div ui-view></div>"
        })
        .state("app.comp.role.list", {
            url: "/list",
            templateUrl: "View/Role/RoleInfo.html?data=" + Timestamp,
            controller: "RoleListController",
            loadJs: ["Content/script/app/Role/JS_RoleInfo.js"],
            resolve: app.resolve
        })
        .state("app.comp.role.detail", {
            url: "/detail",
            templateUrl: "View/Role/RoleDetail.html?data=" + Timestamp
        })
        .state("app.role.view", {
            url: "/view",
            templateUrl: "View/Role/RoleView.html?data=" + Timestamp
        })
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>系统级别管理配置</summary>
    $stateProvider
       .state("app.sys", {
           url: "/sys",
           template: "<div ui-view></div>"
       })
       .state("app.sys.info", {
           url: "/info",
           templateUrl: "View/System/CurrentUserInfo.html?data=" + Timestamp
       })
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>用户信息管理配置</summary>
    $stateProvider
        .state("app.comp.user", {
            url: "/user",
            template: "<div ui-view></div>"
        })
        .state("app.comp.user.list", {
            url: "/list",
            templateUrl: "View/User/UserList.html?data=" + Timestamp,
            controller: "UserListController",
            loadJs: ["Content/script/app/User/JS_UserList.js"],
            resolve: app.resolve
        })
        .state("app.comp.user.detail", {
            url: "/detail/:accId",
            templateUrl: "View/User/UserDetail.html?data=" + Timestamp,
            controller: "UserDetailController",
            loadJs: ["Content/script/app/User/JS_UserDetail.js"],
            resolve: app.resolve
        })
        .state("app.comp.user.view", {
            url: "/view/:accId",
            templateUrl: "View/User/UserView.html?data=" + Timestamp,
            controller: "UserViewController",
            loadJs: ["Content/script/app/User/JS_UserView.js"],
            resolve: app.resolve
        })
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>手术订单列表管理</summary>
    $stateProvider
        .state("app.order.complex", {
            /// <summary>综合查询</summary>
            url: "/complex",
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "IntegratedListController",
            loadJs: ["Content/script/app/Order/Surgery/List/JS_IntegratedList.js"],
            resolve: app.resolve
        })
        .state("app.order.orderlist", {
            /// <summary>我的手术订单列表</summary>
            url: "/orderlist",
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "MyOrderListController",
            loadJs: ["Content/script/app/Order/Surgery/List/JS_Integrated-MyOrderList.js"],
            resolve: app.resolve
        })
        .state("app.order.draft", {
            /// <summary>草稿订单列表</summary>
            url: "/draft",
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "MyDraftListController",
            loadJs: ["Content/script/app/Order/Surgery/List/JS_Integrated-MyDraftList.js"],
            resolve: app.resolve
        })
        .state("app.order.approval", {
            /// <summary>手术订单审批列表</summary>
            url: "/approval",
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "ApprovalListController",
            loadJs: ["Content/script/app/Order/Surgery/List/JS_Integrated-ApprovalList.js"],
            resolve: app.resolve
        })
        .state("app.order.deal", {
            /// <summary>订单处理列表</summary>
            url: "/deal",
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "DealWithListController",
            loadJs: ["Content/script/app/Order/Surgery/List/JS_Integrated-DealWithList.js"],
            resolve: app.resolve
        })
        .state("app.order.stock", {
            /// <summary>追加备货信息</summary>
            url: "/stock",
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "AppendListController",
            loadJs: ["Content/script/app/Order/Surgery/List/JS_Integrated-AppendList.js"],
            resolve: app.resolve
        })
        .state("app.order.sign", {
            /// <summary>签收单信息</summary>
            url: "/sign",
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "SignListController",
            loadJs: ["Content/script/app/Order/Surgery/List/JS_Integrated-SignList.js"],
            resolve: app.resolve
        })
        .state("app.order.apply", {
            /// <summary>返库申请</summary>
            url: "/apply",
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "ApplyListController",
            loadJs: ["Content/script/app/Order/Surgery/List/JS_Integrated-ApplyList.js"],
            resolve: app.resolve
        })
        .state("app.order.back", {
            /// <summary>返库处理</summary>
            url: "/back",
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "BackListController",
            loadJs: ["Content/script/app/Order/Surgery/List/JS_Integrated-BackList.js"],
            resolve: app.resolve
        })
        .state("app.order.feedback", {
            /// <summary>反馈单草稿</summary>
            url: "/feedback",
            templateUrl: "View/Order/Surgery/IntegratedOderList.html?data=" + Timestamp,
            controller: "FeedbackListController",
            loadJs: ["Content/script/app/Order/Surgery/List/JS_Integrated-FeedbackList.js"],
            resolve: app.resolve
        })
        .state("app.order.delivery", {
            /// <summary>出库单查询</summary>
            url: "/delivery",
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
           templateUrl: "View/Order/Surgery/Single.html?data=" + Timestamp,
           controller: "SingleController"
       })
        .state("app.order.view", {
            /// <summary>手术订单视图</summary>
            url: "/view/:sono",
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
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>备货订单列表管理</summary>
    $stateProvider
        .state("app.stock.list", {
            /// <summary>备货订单列表</summary>
            url: "/list",
            templateUrl: "View/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "MyStockListController",
            loadJs: ["Content/script/app/Order/Stock/List/JS_Integrated-MyStockList.js"],
            resolve: app.resolve
        })
        .state("app.stock.draft", {
            /// <summary>草稿订单列表</summary>
            url: "/draft",
            templateUrl: "View/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "StockMyDraftListController",
            loadJs: ["Content/script/app/Order/Stock/List/JS_Integrated-MyDraftList.js"],
            resolve: app.resolve
        })
        .state("app.stock.approval", {
            /// <summary>备货单审批</summary>
            url: "/approval",
            templateUrl: "View/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "StockApprovalListController",
            loadJs: ["Content/script/app/Order/Stock/List/JS_Integrated-ApprovalList.js"],
            resolve: app.resolve
        })
        .state("app.stock.deal", {
            /// <summary>备货订单处理</summary>
            url: "/deal",
            templateUrl: "View/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "StockDealWithListController",
            loadJs: ["Content/script/app/Order/Stock/List/JS_Integrated-DealWithList.js"],
            resolve: app.resolve
        })
        .state("app.stock.sign", {
            /// <summary>备货订单签收管理</summary>
            url: "/sign",
            templateUrl: "View/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "StockSignListController",
            loadJs: ["Content/script/app/Order/Stock/List/JS_Integrated-SignList.js"],
            resolve: app.resolve
        })
        .state("app.stock.complex", {
            /// <summary>备货订单综合查询</summary>
            url: "/complex",
            templateUrl: "View/Order/Stock/IntegratedStockList.html?data=" + Timestamp,
            controller: "StockIntegratedListController",
            loadJs: ["Content/script/app/Order/Stock/List/JS_IntegratedList.js"],
            resolve: app.resolve
        })
        .state("app.stock.delivery", {
            /// <summary>备货订单出库单查询</summary>
            url: "/delivery",
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
           templateUrl: "View/Order/Stock/Single.html?data=" + Timestamp,
           controller: "StockSingleController"
       })
        .state("app.stock.view", {
            /// <summary>备货订单视图</summary>
            url: "/view/:sono",
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
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>我的业务数据</summary>
    $stateProvider
        .state("app.mybusiness.materialtemplate", {
            /// <summary>物料模板管理</summary>
            url: "/materialtemplate",
            controller: "MaterialTemplateListController",
            templateUrl: "View/MyBusiness/MaterialTemplate/MaterialTemplateList.html?data=" + Timestamp,
            loadJs: ["Content/script/app/MyBusiness/MaterialTemplate/JS_MaterialTemplateList.js"],
            resolve: app.resolve
        })
        .state("app.mybusiness.material", {
            /// <summary>物料管理</summary>
            url: "/material",
            templateUrl: "View/MyBusiness/Material/MaterialList.html?data=" + Timestamp,
            controller: "MaterialController",
            loadJs: ["Content/script/app/MyBusiness/Material/JS_MaterialList.js"],
            resolve: app.resolve

        })
         .state("app.mybusiness.materialDetailed", {
             /// <summary>物料详情</summary>
             url: "/material/:opt",
             templateUrl: "View/MyBusiness/Material/MaterialDetail.html?data=" + Timestamp,
             controller: "MaterialDetailController",
             loadJs: ["Content/script/app/MyBusiness/Material/JS_MaterialDetail.js"],
             resolve: app.resolve
         })
        .state("app.mybusiness.kits", {
            /// <summary>物料套件管理</summary>
            url: "/kits",
            controller: "MedKitListController",
            templateUrl: "View/MyBusiness/MedKit/MedKitList.html?data=" + Timestamp,
            loadJs: ["Content/script/app/MyBusiness/MedKit/JS_MedKitList.js"],
            resolve: app.resolve
        })
});


/// 我的地址、我的医生
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    $stateProvider
    .state("app.mybusiness.address", {
        /// <summary>我的地址</summary>
        url: "/address",
        controller: "AddressListController",
        templateUrl: "View/MyBusiness/Address/AddressList.html?data=" + Timestamp,
        loadJs: ["Content/script/app/MyBusiness/Address/JS_AddressList.js"],
        resolve: app.resolve
    })
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    $stateProvider
    .state("app.mybusiness.doctor", {
        /// <summary>我的医院</summary>
        url: "/doctor",
        controller: "DoctorListController",
        templateUrl: "View/MyBusiness/Doctor/DoctorList.html?data=" + Timestamp,
        loadJs: ["Content/script/app/MyBusiness/Doctor/JS_DoctorList.js"],
        resolve: app.resolve
    })
});
//经销商、货主、关系、经销商事件通知
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>经销商组织管理</summary>
    $stateProvider
       .state("app.business.dlorganization", {
           /// <summary>经销商组织列表</summary>
           url: "/dlorganization",
           templateUrl: "View/Business/DlOrg/DlOrgList.html?data=" + Timestamp,
           controller: "DlOrgListController",
           loadJs: ["Content/script/app/Business/DlOrg/JS_DlOrgList.js"],
           resolve: app.resolve
       })
       .state("app.business.dlorganizationEduit", {
           /// <summary>经销商组织编辑</summary>
           url: "/dlorganizationEduit/:dlopt",
           templateUrl: "View/Business/DlOrg/DlOrgEduit.html?data=" + Timestamp,
           controller: "DlOrgEduitController",
           loadJs: ["Content/script/app/Business/DlOrg/JS_DlOrgEduit.js"],
           resolve: app.resolve
       })
        .state("app.business.dlorganizationView", {
            /// <summary>经销商组织详情</summary>
            url: "/dlorganizationView/:dlopt",
            templateUrl: "View/Business/DlOrg/DlOrgView.html?data=" + Timestamp,
            controller: "DlOrgViewController",
            loadJs: ["Content/script/app/Business/DlOrg/JS_DlOrgView.js"],
            resolve: app.resolve
        })
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>货主组织管理</summary>
    $stateProvider
       .state("app.business.oiorganization", {
           /// <summary>货主组织列表</summary>
           url: "/oiorganization",
           templateUrl: "View/Business/OiOrg/OiOrgList.html?data=" + Timestamp,
           controller: "OiOrgListController",
           loadJs: ["Content/script/app/Business/OiOrg/JS_OiOrgList.js"],
           resolve: app.resolve
       })
      .state("app.business.oiorganizationEduit", {
          /// <summary>货主组织编辑</summary>
          url: "/oiorganizationEduit/:oiopt",
          templateUrl: "View/Business/OiOrg/OiOrgEduit.html?data=" + Timestamp,
          controller: "OiOrgEduitController",
          loadJs: ["Content/script/app/Business/OiOrg/JS_OiOrgEduit.js"],
          resolve: app.resolve
      })
       .state("app.business.oiorganizationView", {
           /// <summary>货主组织详情</summary>
           url: "/oiorganizationView/:oiopt",
           templateUrl: "View/Business/OiOrg/OiOrgView.html?data=" + Timestamp,
           controller: "OiOrgViewController",
           loadJs: ["Content/script/app/Business/OiOrg/JS_OiOrgView.js"],
           resolve: app.resolve
       })
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>经销商货主关系管理</summary>
    $stateProvider
       .state("app.business.relmanagement", {
           /// <summary>经销商货主关系列表</summary>
           url: "/relmanagement",
           templateUrl: "View/Business/RelMan/RelManList.html?data=" + Timestamp,
           controller: "RelManListController",
           loadJs: ["Content/script/app/Business/RelMan/JS_RelManList.js"],
           resolve: app.resolve
       })
       .state("app.business.relmanagement.relmanagementView", {
           /// <summary>经销商货主关系编辑</summary>
           url: "/relmanagementView/:relopt",
           templateUrl: "View/Business/RelMan/RelManView.html?data=" + Timestamp,
           controller: "RelManViewController",
           loadJs: ["Content/script/app/Business/RelMan/JS_RelManView.js"],
           resolve: app.resolve
       })
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>经销商订单事件通知管理</summary>
    $stateProvider
       .state("app.business.dlmanagementnotice", {
           /// <summary>经销商订单事件通知列表</summary>
           url: "/dlmanagementnotice",
           templateUrl: "View/Business/Notice/NoticeList.html?data=" + Timestamp,
           controller: "NoticeListController",
           loadJs: ["Content/script/app/Business/Notice/JS_NoticeList.js"],
           resolve: app.resolve
       })
       .state("app.business.dlmanagementnoticeEduit", {
           /// <summary>经销商订单事件通知编辑</summary>
           url: "/dlmanagementnoticeEduit/:dlnoticeopt",
           templateUrl: "View/Business/Notice/NoticeEduit.html?data=" + Timestamp,
           controller: "NoticeEduitController",
           loadJs: ["Content/script/app/Business/Notice/JS_NoticeEduit.js"],
           resolve: app.resolve
       })
        .state("app.business.dlmanagementnoticeView", {
            /// <summary>经销商订单事件通知详情</summary>
            url: "/dlmanagementnoticeView/:dlnoticeopt",
            templateUrl: "View/Business/Notice/NoticeView.html?data=" + Timestamp,
            controller: "NoticeViewController",
            loadJs: ["Content/script/app/Business/Notice/JS_NoticeView.js"],
            resolve: app.resolve
        })
});
//医院、科室、医生
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>医院管理</summary>
    $stateProvider
       .state("app.business.hplmanagement", {
           /// <summary>医院列表</summary>
           url: "/hplmanagement",
           templateUrl: "View/Business/Hospital/HplList.html?data=" + Timestamp,
           controller: "HplListController",
           loadJs: ["Content/script/app/Business/Hospital/JS_HplList.js"],
           resolve: app.resolve
       })
       .state("app.business.hplmanagementEduit", {
           /// <summary>医院编辑</summary>
           url: "/hplmanagementEduit/:hplopt",
           templateUrl: "View/Business/Hospital/HplEduit.html?data=" + Timestamp,
           controller: "HplEduitController",
           loadJs: ["Content/script/app/Business/Hospital/JS_HplEduit.js"],
           resolve: app.resolve
       })
        .state("app.business.hplmanagementView", {
            /// <summary>医院详情</summary>
            url: "/hplmanagementView/:hplopt",
            templateUrl: "View/Business/Hospital/HplView.html?data=" + Timestamp,
            controller: "HplViewController",
            loadJs: ["Content/script/app/Business/Hospital/JS_HplView.js"],
            resolve: app.resolve
        })
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>科室管理</summary>
    $stateProvider
       .state("app.business.dptmanagement", {
           /// <summary>科室列表</summary>
           url: "/dptmanagement",
           templateUrl: "View/Business/Department/DptList.html?data=" + Timestamp,
           controller: "DptListController",
           loadJs: ["Content/script/app/Business/Department/JS_DptList.js"],
           resolve: app.resolve
       })
      .state("app.business.dptmanagementEduit", {
          /// <summary>科室编辑</summary>
          url: "/dptmanagementEduit/:oiopt",
          templateUrl: "View/Business/Department/DptEduit.html?data=" + Timestamp,
          controller: "DptEduitController",
          loadJs: ["Content/script/app/Business/Department/JS_DptEduit.js"],
          resolve: app.resolve
      })
       .state("app.business.dptmanagementView", {
           /// <summary>科室详情</summary>
           url: "/dptmanagementView/:oiopt",
           templateUrl: "View/Business/Department/DptView.html?data=" + Timestamp,
           controller: "DptViewController",
           loadJs: ["Content/script/app/Business/Department/JS_DptView.js"],
           resolve: app.resolve
       })
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>医生管理</summary>
    $stateProvider
       .state("app.business.dtrmanagement", {
           /// <summary>医生列表</summary>
           url: "/dtrmanagement",
           templateUrl: "View/Business/Doctor/DtrList.html?data=" + Timestamp,
           controller: "DtrListController",
           loadJs: ["Content/script/app/Business/Doctor/JS_DtrList.js"],
           resolve: app.resolve
       })
      .state("app.business.dtrmanagementEduit", {
          /// <summary>医生编辑</summary>
          url: "/dtrmanagementEduit/:oiopt",
          templateUrl: "View/Business/Doctor/DtrEduit.html?data=" + Timestamp,
          controller: "DtrEduitController",
          loadJs: ["Content/script/app/Business/Doctor/JS_DtrEduit.js"],
          resolve: app.resolve
      })
       .state("app.business.dtrmanagementView", {
           /// <summary>医生详情</summary>
           url: "/dtrmanagementView/:oiopt",
           templateUrl: "View/Business/Doctor/DtrView.html?data=" + Timestamp,
           controller: "DtrViewController",
           loadJs: ["Content/script/app/Business/Doctor/JS_DtrView.js"],
           resolve: app.resolve
       })
});
//厂商、仓库、库区管理
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>厂家管理</summary>
    $stateProvider
       .state("app.business.ftymanagement", {
           /// <summary>厂家列表</summary>
           url: "/ftymanagement",
           templateUrl: "View/Business/Facture/FactureList.html?data=" + Timestamp,
           controller: "FactureListController",
           loadJs: ["Content/script/app/Business/Facture/JS_FactureList.js"],
           resolve: app.resolve
       })
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>仓库管理</summary>
    $stateProvider
       .state("app.business.whmanagement", {
           /// <summary>仓库列表</summary>
           url: "/whmanagement",
           templateUrl: "View/Business/WareHouse/WareHouseList.html?data=" + Timestamp,
           controller: "WareHouseListController",
           loadJs: ["Content/script/app/Business/WareHouse/JS_WareHouseList.js"],
           resolve: app.resolve
       })
      .state("app.business.whmanagementEduit", {
          /// <summary>仓库编辑</summary>
          url: "/whmanagementEduit/:whopt",
          templateUrl: "View/Business/WareHouse/WareHouseEduit.html?data=" + Timestamp,
          controller: "WareHouseEduitController",
          loadJs: ["Content/script/app/Business/WareHouse/JS_WareHouseEduit.js"],
          resolve: app.resolve
      })
       .state("app.business.whmanagementView", {
           /// <summary>仓库详情</summary>
           url: "/whmanagementView/:whopt",
           templateUrl: "View/Business/WareHouse/WareHouseView.html?data=" + Timestamp,
           controller: "WareHouseViewController",
           loadJs: ["Content/script/app/Business/WareHouse/JS_WareHouseView.js"],
           resolve: app.resolve
       })
});
// 品牌、产品线管理、我的产品
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary品牌管理</summary>
    $stateProvider
       .state("app.business.brandmanagement", {
           /// <summary>品牌列表</summary>
           url: "/brandmanagement",
           templateUrl: "View/Business/Brand/BrandList.html?data=" + Timestamp,
           controller: "BrandListController",
           loadJs: ["Content/script/app/Business/Brand/JS_BrandList.js"],
           resolve: app.resolve
       })
});
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>产品线管理</summary>
    $stateProvider
       .state("app.business.productlinemanagement", {
           /// <summary>产品线列表</summary>
           url: "/productlinemanagement",
           templateUrl: "View/Business/ProductLine/ProductLineList.html?data=" + Timestamp,
           controller: "ProductLineController",
           loadJs: ["Content/script/app/Business/ProductLine/JS_ProductLineList.js"],
           resolve: app.resolve
       })
})
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>我的产品管理</summary>
    $stateProvider
       .state("app.business.productmanagement", {
           /// <summary>我的产品列表</summary>
           url: "/productmanagement",
           templateUrl: "View/Business/AgentProduct/AgentProductList.html?data=" + Timestamp,
           controller: "ProductListController",
           loadJs: ["Content/script/app/Business/AgentProduct/JS_AgentProductList.js"],
           resolve: app.resolve
       })
});
app.resolve = {
    /// <summary>resolve事件处理</summary>
    deps: function ($q) {
        /// <summary>deps事件处理</summary>
        var delay = $q.defer();
        var jsList = this.self.loadJs;
        for (var i = 0; i < jsList.length; i++) {
            $.getScript(jsList[i] + "?data=" + Timestamp, function () {
                delay.resolve();
            });
        }
        return delay.promise;
    }
}
app.controller("HomeController", function ($scope, $state, $MenuService, $local, $MessagService, $Api, $window) {
    /// <summary>首页控制器</summary>
    var classList = ["one", "three", "four", "five", "six"];
    $scope.homeClass = classList[0];
    var index = 0;
    setInterval(function () {
        index++;
        if (index > classList.length - 1) {
            index = 0
        }
        $scope.$apply(function () {
            $scope.homeClass = classList[index];
        });
    }, 3000);
});
app.controller("masterController", function ($scope, $state, $MenuService, $local, $MessagService, $Api, $window) {
    /// <summary>模板信息控制器</summary>
    $scope.fold = false;
    $scope.view = { header: "View/MasterPages/header.html?data=" + Timestamp, footer: "View/MasterPages/footer.html?data=" + Timestamp, menu: "View/MasterPages/menu.html?data=" + Timestamp }
    $scope.User = $local.getValue("USER");
    console.log($scope.User);
    $scope.AdjustmentFold = function () {
        /// <summary>调整折叠</summary>
        $scope.fold = !$scope.fold;
    }
    $scope.includes = function (data) {
        return $state.includes(data);//获取菜单路径
    }
    $scope.menuList = $MenuService;//菜单信息列表
    $scope.goView = function (name, param) {
        /// <summary>前往页面</summary>
        $state.go(name, param);
    }

    $scope.goLastPage = function () {
        /// <summary>返回上一页</summary>
        $window.history.back();
    }

    $scope.SignOut = function () {
        /// <summary>登出</summary>
        $Api.AccountService.LoginOut({}, function () {
            $local.setValue("USER", null);
            $scope.goView("login");
        });
    }

    $scope.Comp = function (code) {
        /// <summary>菜单权限控制</summary>
        return JSON.stringify($scope.User.functionInfo).indexOf(code) > -1;//判断菜单是否有权限
    }
});
app.controller("employeeController", function ($scope, $state, $MenuService, $local, $MessagService, $Api) {
    /// <summary>个人信息控制器</summary>
    $scope.msgBox = {};
    $scope.modifyPwd = {
        pwsInfo: {},
        show: function () {
            /// <summary>显示修改密码的信息</summary>
            $scope.modifyPwd.pwsInfo = { oldPassword: "", newPassword: "", verifyPassword: "" };
            $scope.modifyPwd.dialog.show()
        },
        verify: function () {
            /// <summary>验证密码的有效性</summary>
            var result = true;
            if (!$scope.modifyPwd.pwsInfo.oldPassword || !$scope.modifyPwd.pwsInfo.newPassword || !$scope.modifyPwd.pwsInfo.verifyPassword) {
                result = false;
            } else if (($scope.modifyPwd.pwsInfo.oldPassword == $scope.modifyPwd.pwsInfo.newPassword) || ($scope.modifyPwd.pwsInfo.verifyPassword != $scope.modifyPwd.pwsInfo.newPassword)) {
                result = false;
            }
            return result;
        },
        dialog: {
            title: $scope.User.userInfo.userName + "修改密码", width: 500,
            buttons: {
                "保存": function () {
                    /// <summary>保存修改的密码</summary>
                    $MessagService.loading("服务器请求中，请稍等...");
                    if ($scope.modifyPwd.verify()) {
                        $Api.AccountService.ModifyPassword($scope.modifyPwd.pwsInfo, function (rData) {
                            $MessagService.caveat("密码修改成功！");
                            $scope.modifyPwd.dialog.hide();
                        });
                    } else {
                        $MessagService.eorr("验证无效，请重新输入！");
                    }

                }, "取消": function () { $scope.modifyPwd.dialog.hide(); }
            }
        }
    }
});