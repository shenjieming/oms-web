
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
            cache: false,
            templateUrl: "View/Basis/AdmdivisionList.html?data=" + Timestamp,
            controller: "AdmdivisionListController",
            loadJs: ["Content/script/app/Base/JS_AdmdivisionList.js"],
            resolve: app.resolve
        })
        .state("app.basis.country", {
            /// <summary>国家列表维护</summary>
            url: "/country",
            cache: false,
            templateUrl: "View/Basis/CountryList.html?data=" + Timestamp,
            controller: "CountryListController",
            loadJs: ["Content/script/app/Base/JS_CountryList.js"],
            resolve: app.resolve
        })
        .state("app.basis.currency", {
            /// <summary>币别列表维护</summary>
            url: "/currency",
            cache: false,
            templateUrl: "View/Basis/CurrencyList.html?data=" + Timestamp,
            controller: "CurrencyListController",
            loadJs: ["Content/script/app/Base/JS_CurrencyList.js"],
            resolve: app.resolve
        })
        .state("app.basis.dictionary", {
            /// <summary>数据字典维护</summary>
            url: "/dictionary",
            cache: false,
            templateUrl: "View/Basis/DictionaryList.html?data=" + Timestamp,
            controller: "DictionaryListController",
            loadJs: ["Content/script/app/Base/JS_DictionaryList.js"],
            resolve: app.resolve
        })
        .state("app.basis.event", {
            /// <summary>事件编码维护</summary>
            url: "/event",
            cache: false,
            templateUrl: "View/Basis/EventCodeList.html?data=" + Timestamp,
            controller: "EventCodeListController",
            loadJs: ["Content/script/app/Base/JS_EventCodeList.js"],
            resolve: app.resolve
        })
        .state("app.basis.lang", {
            /// <summary>语言列表维护</summary>
            url: "/lang",
            cache: false,
            templateUrl: "View/Basis/LanguageList.html?data=" + Timestamp,
            controller: "LanguageListController",
            loadJs: ["Content/script/app/Base/JS_LanguageList.js"],
            resolve: app.resolve
        })
         .state("app.basis.journal", {
             /// <summary>用户登录日志查询</summary>
             url: "/journal",
             cache: false,
             templateUrl: "View/Basis/journalInfo.html?data=" + Timestamp,
             controller: "JournalInfoController",
             loadJs: ["Content/script/app/Base/JS_JournalInfo.js"],
             resolve: app.resolve
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
            cache: false,
            templateUrl: "View/Role/RoleInfo.html?data=" + Timestamp,
            controller: "RoleListController",
            loadJs: ["Content/script/app/Role/JS_RoleInfo.js"],
            resolve: app.resolve
        })
        .state("app.comp.role.detail", {
            url: "/detail",
            cache: false,
            templateUrl: "View/Role/RoleDetail.html?data=" + Timestamp
        })
        .state("app.role.view", {
            url: "/view",
            cache: false,
            templateUrl: "View/Role/RoleView.html?data=" + Timestamp
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
           cache: false,
           templateUrl: "View/Group/GroupList.html?data=" + Timestamp,
           controller: "GroupListController",
           loadJs: ["Content/script/app/Group/JS_GroupInfo.js"],
           resolve: app.resolve
       })
       .state("app.comp.group.detail", {
           /// <summary>群组用户详情</summary>
           url: "/detail/:teamCodeId",
           cache: false,
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
          cache: false,
          templateUrl: "View/Menu/MenuList.html?data=" + Timestamp,
          controller: "MenuListController",
          loadJs: ["Content/script/app/Menu/JS_MenuInfo.js"],
          resolve: app.resolve
      })
        .state("app.comp.menu.view", {
            /// <summary>群组绑定用户</summary>
            url: "/view",
            cache: false,
            templateUrl: "View/Menu/MenuView.html?data=" + Timestamp
        })
});