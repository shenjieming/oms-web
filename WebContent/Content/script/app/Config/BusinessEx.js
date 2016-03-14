
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>我的业务数据</summary>
    $stateProvider
        .state("app.mybusiness.materialtemplate", {
            /// <summary>物料模板管理</summary>
            url: "/materialtemplate",
            cache: false,
            controller: "MaterialTemplateListController",
            templateUrl: "View/MyBusiness/MaterialTemplate/MaterialTemplateList.html?data=" + Timestamp,
            loadJs: ["Content/script/app/MyBusiness/MaterialTemplate/JS_MaterialTemplateList.js"],
            resolve: app.resolve
        })
        .state("app.mybusiness.materialtemplatedetail", {
            /// <summary>物料模板管理</summary>
            url: "/materialtemplatedetail/:tmplSODetailID",
            cache: false,
            controller: "MaterialTemplateController",
            templateUrl: "View/MyBusiness/MaterialTemplate/MaterialTemplateDetail.html?data=" + Timestamp,
            loadJs: ["Content/script/app/MyBusiness/MaterialTemplate/JS_MaterialTemplateList.js"],
            resolve: app.resolve
        })
          .state("app.mybusiness.materialtemplateview", {
              /// <summary>物料模板管理</summary>
              url: "/materialtemplateview/:tmplSODetailID/:isView",
              cache: false,
              controller: "MaterialTemplateController",
              templateUrl: "View/MyBusiness/MaterialTemplate/MaterialTemplateView.html?data=" + Timestamp,
              loadJs: ["Content/script/app/MyBusiness/MaterialTemplate/JS_MaterialTemplateList.js"],
              resolve: app.resolve
          })
        .state("app.mybusiness.material", {
            /// <summary>物料管理</summary>
            url: "/material",
            cache: false,
            templateUrl: "View/MyBusiness/Material/MaterialList.html?data=" + Timestamp,
            controller: "MaterialController",
            loadJs: ["Content/script/app/MyBusiness/Material/JS_MaterialList.js"],
            resolve: app.resolve

        })
         .state("app.mybusiness.materialdetail", {
             /// <summary>物料详情</summary>
             url: "/material/:medMIInternalNo&:medBrandCode&:medBrandCodeName&:oIOrgCode&:oIOrgCodeName&:medProdLnCode&:medProdLnCodeName",
             cache: false,
             templateUrl: "View/MyBusiness/Material/MaterialDetail.html?data=" + Timestamp,
             controller: "MaterialDetailController",
             loadJs: ["Content/script/app/MyBusiness/Material/JS_MaterialDetail.js"],
             resolve: app.resolve
         })
         .state("app.mybusiness.materialview", {
             /// <summary>物料详情</summary>
             url: "/MaterialView/:medMIInternalNo",
             cache: false,
             templateUrl: "View/MyBusiness/Material/MaterialView.html?data=" + Timestamp,
             controller: "MaterialViewController",
             loadJs: ["Content/script/app/MyBusiness/Material/JS_MaterialView.js"],
             resolve: app.resolve
         })
        .state("app.mybusiness.kits", {
            /// <summary>物料套件管理</summary>
            url: "/kits",
            cache: false,
            controller: "MedKitListController",
            templateUrl: "View/MyBusiness/MedKit/MedKitList.html?data=" + Timestamp,
            loadJs: ["Content/script/app/MyBusiness/MedKit/JS_MedKitList.js"],
            resolve: app.resolve
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
            cache: false,
            templateUrl: "View/User/UserList.html?data=" + Timestamp,
            controller: "UserListController",
            loadJs: ["Content/script/app/User/JS_UserList.js"],
            resolve: app.resolve
        })
        .state("app.comp.user.detail", {
            url: "/detail/:accId",
            cache: false,
            templateUrl: "View/User/UserDetail.html?data=" + Timestamp,
            controller: "UserDetailController",
            loadJs: ["Content/script/app/User/JS_UserDetail.js"],
            resolve: app.resolve
        })
        .state("app.comp.user.view", {
            url: "/view/:accId",
            cache: false,
            templateUrl: "View/User/UserView.html?data=" + Timestamp,
            controller: "UserViewController",
            loadJs: ["Content/script/app/User/JS_UserView.js"],
            resolve: app.resolve
        })
});