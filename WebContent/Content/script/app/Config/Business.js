/// <reference path="../Config.js" />


/// 我的地址、我的医生
app.config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    $stateProvider
    .state("app.mybusiness.address", {
        /// <summary>我的地址</summary>
        url: "/address",
        cache: false,
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
        cache: false,
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
           cache: false,
           templateUrl: "View/Business/DlOrg/DlOrgList.html?data=" + Timestamp,
           controller: "DlOrgListController",
           loadJs: ["Content/script/app/Business/DlOrg/JS_DlOrgList.js"],
           resolve: app.resolve
       })
       .state("app.business.dlorganizationEduit", {
           /// <summary>经销商组织编辑</summary>
           url: "/dlorganizationEduit/:dlopt",
           cache: false,
           templateUrl: "View/Business/DlOrg/DlOrgEduit.html?data=" + Timestamp,
           controller: "DlOrgEduitController",
           loadJs: ["Content/script/app/Business/DlOrg/JS_DlOrgEduit.js"],
           resolve: app.resolve
       })
        .state("app.business.dlorganizationView", {
            /// <summary>经销商组织详情</summary>
            url: "/dlorganizationView/:dlopt",
            cache: false,
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
           cache: false,
           templateUrl: "View/Business/OiOrg/OiOrgList.html?data=" + Timestamp,
           controller: "OiOrgListController",
           loadJs: ["Content/script/app/Business/OiOrg/JS_OiOrgList.js"],
           resolve: app.resolve
       })
      .state("app.business.oiorganizationEduit", {
          /// <summary>货主组织编辑</summary>
          url: "/oiorganizationEduit/:oiopt",
          cache: false,
          templateUrl: "View/Business/OiOrg/OiOrgEduit.html?data=" + Timestamp,
          controller: "OiOrgEduitController",
          loadJs: ["Content/script/app/Business/OiOrg/JS_OiOrgEduit.js"],
          resolve: app.resolve
      })
       .state("app.business.oiorganizationView", {
           /// <summary>货主组织详情</summary>
           url: "/oiorganizationView/:oiopt",
           cache: false,
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
           cache: false,
           templateUrl: "View/Business/RelMan/RelManList.html?data=" + Timestamp,
           controller: "RelManListController",
           loadJs: ["Content/script/app/Business/RelMan/JS_RelManList.js"],
           resolve: app.resolve
       })
       .state("app.business.relmanagement.relmanagementView", {
           /// <summary>经销商货主关系编辑</summary>
           url: "/relmanagementView/:relopt",
           cache: false,
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
           cache: false,
           templateUrl: "View/Business/Notice/NoticeList.html?data=" + Timestamp,
           controller: "NoticeListController",
           loadJs: ["Content/script/app/Business/Notice/JS_NoticeList.js"],
           resolve: app.resolve
       })
       .state("app.business.dlmanagementnoticeEduit", {
           /// <summary>经销商订单事件通知编辑</summary>
           url: "/dlmanagementnoticeEduit/:dlnoticeopt",
           cache: false,
           templateUrl: "View/Business/Notice/NoticeEduit.html?data=" + Timestamp,
           controller: "NoticeEduitController",
           loadJs: ["Content/script/app/Business/Notice/JS_NoticeEduit.js"],
           resolve: app.resolve
       })
        .state("app.business.dlmanagementnoticeView", {
            /// <summary>经销商订单事件通知详情</summary>
            url: "/dlmanagementnoticeView/:dlnoticeopt",
            cache: false,
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
           cache: false,
           templateUrl: "View/Business/Hospital/HplList.html?data=" + Timestamp,
           controller: "HplListController",
           loadJs: ["Content/script/app/Business/Hospital/JS_HplList.js"],
           resolve: app.resolve
       })
       .state("app.business.hplmanagementEduit", {
           /// <summary>医院编辑</summary>
           url: "/hplmanagementEduit/:hplopt",
           cache: false,
           templateUrl: "View/Business/Hospital/HplEduit.html?data=" + Timestamp,
           controller: "HplEduitController",
           loadJs: ["Content/script/app/Business/Hospital/JS_HplEduit.js"],
           resolve: app.resolve
       })
        .state("app.business.hplmanagementView", {
            /// <summary>医院详情</summary>
            url: "/hplmanagementView/:hplopt",
            cache: false,
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
           cache: false,
           templateUrl: "View/Business/Department/DptList.html?data=" + Timestamp,
           controller: "DptListController",
           loadJs: ["Content/script/app/Business/Department/JS_DptList.js"],
           resolve: app.resolve
       })
      .state("app.business.dptmanagementEduit", {
          /// <summary>科室编辑</summary>
          url: "/dptmanagementEduit/:oiopt",
          cache: false,
          templateUrl: "View/Business/Department/DptEduit.html?data=" + Timestamp,
          controller: "DptEduitController",
          loadJs: ["Content/script/app/Business/Department/JS_DptEduit.js"],
          resolve: app.resolve
      })
       .state("app.business.dptmanagementView", {
           /// <summary>科室详情</summary>
           url: "/dptmanagementView/:oiopt",
           cache: false,
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
           cache: false,
           templateUrl: "View/Business/Doctor/DtrList.html?data=" + Timestamp,
           controller: "DtrListController",
           loadJs: ["Content/script/app/Business/Doctor/JS_DtrList.js"],
           resolve: app.resolve
       })
      .state("app.business.dtrmanagementEduit", {
          /// <summary>医生编辑</summary>
          url: "/dtrmanagementEduit/:oiopt",
          cache: false,
          templateUrl: "View/Business/Doctor/DtrEduit.html?data=" + Timestamp,
          controller: "DtrEduitController",
          loadJs: ["Content/script/app/Business/Doctor/JS_DtrEduit.js"],
          resolve: app.resolve
      })
       .state("app.business.dtrmanagementView", {
           /// <summary>医生详情</summary>
           url: "/dtrmanagementView/:oiopt",
           cache: false,
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
           cache: false,
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
           cache: false,
           templateUrl: "View/Business/WareHouse/WareHouseList.html?data=" + Timestamp,
           controller: "WareHouseListController",
           loadJs: ["Content/script/app/Business/WareHouse/JS_WareHouseList.js"],
           resolve: app.resolve
       })
      .state("app.business.whmanagementEduit", {
          /// <summary>仓库编辑</summary>
          url: "/whmanagementEduit/:whopt",
          cache: false,
          templateUrl: "View/Business/WareHouse/WareHouseEduit.html?data=" + Timestamp,
          controller: "WareHouseEduitController",
          loadJs: ["Content/script/app/Business/WareHouse/JS_WareHouseEduit.js"],
          resolve: app.resolve
      })
       .state("app.business.whmanagementView", {
           /// <summary>仓库详情</summary>
           url: "/whmanagementView/:whopt",
           cache: false,
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
           cache: false,
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
           cache: false,
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
           cache: false,
           templateUrl: "View/Business/AgentProduct/AgentProductList.html?data=" + Timestamp,
           controller: "ProductListController",
           loadJs: ["Content/script/app/Business/AgentProduct/JS_AgentProductList.js"],
           resolve: app.resolve
       })
});