﻿var BaseApp = angular.module('BaseApp', [])
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>页面配置信息</summary>
        $stateProvider
             .state("app.base", {
                 abstract: true,
                 url: "/base",
                 template: "<div ui-view></div>"
             })
            .state("app.base.comp", {
                /// <summary>权限信息管理</summary>
                url: "/comp",
                abstract: true,
                template: "<div ui-view></div>"
            })
            .state("app.base.mybusiness", {
                /// <summary>我的业务信息管理</summary>
                url: "/mybusiness",
                template: "<div ui-view></div>"
            })
            .state("app.base.business", {
                /// <summary>业务信息管理</summary>
                url: "/business",
                template: "<div ui-view></div>"
            })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>基础信息配置</summary>
        $stateProvider
            .state("app.base.basis", {
                /// <summary>基础数据维护</summary>
                url: "/base",
                template: "<div ui-view></div>"
            })
            .state("app.base.basis.admd", {
                /// <summary>行政区域维护</summary>
                url: "/admd",
                cache: false,
                templateUrl: "View/Basis/AdmdivisionList.html?data=" + Timestamp,
                controller: "AdmdivisionListController",
                loadJs: ["Content/script/app/Base/JS_AdmdivisionList.js"],
                resolve: app.resolve
            })
            .state("app.base.basis.country", {
                /// <summary>国家列表维护</summary>
                url: "/country",
                cache: false,
                templateUrl: "View/Basis/CountryList.html?data=" + Timestamp,
                controller: "CountryListController",
                loadJs: ["Content/script/app/Base/JS_CountryList.js"],
                resolve: app.resolve
            })
            .state("app.base.basis.currency", {
                /// <summary>币别列表维护</summary>
                url: "/currency",
                cache: false,
                templateUrl: "View/Basis/CurrencyList.html?data=" + Timestamp,
                controller: "CurrencyListController",
                loadJs: ["Content/script/app/Base/JS_CurrencyList.js"],
                resolve: app.resolve
            })
            .state("app.base.basis.dictionary", {
                /// <summary>数据字典维护</summary>
                url: "/dictionary",
                cache: false,
                templateUrl: "View/Basis/DictionaryList.html?data=" + Timestamp,
                controller: "DictionaryListController",
                loadJs: ["Content/script/app/Base/JS_DictionaryList.js"],
                resolve: app.resolve
            })
            .state("app.base.basis.event", {
                /// <summary>事件编码维护</summary>
                url: "/event",
                cache: false,
                templateUrl: "View/Basis/EventCodeList.html?data=" + Timestamp,
                controller: "EventCodeListController",
                loadJs: ["Content/script/app/Base/JS_EventCodeList.js"],
                resolve: app.resolve
            })
            .state("app.base.basis.lang", {
                /// <summary>语言列表维护</summary>
                url: "/lang",
                cache: false,
                templateUrl: "View/Basis/LanguageList.html?data=" + Timestamp,
                controller: "LanguageListController",
                loadJs: ["Content/script/app/Base/JS_LanguageList.js"],
                resolve: app.resolve
            })
             .state("app.base.basis.journal", {
                 /// <summary>用户登录日志查询</summary>
                 url: "/journal",
                 cache: false,
                 templateUrl: "View/Basis/journalInfo.html?data=" + Timestamp,
                 controller: "JournalInfoController",
                 loadJs: ["Content/script/app/Base/JS_JournalInfo.js"],
                 resolve: app.resolve
             })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>角色管理配置</summary>
        $stateProvider
            .state("app.base.comp.role", {
                url: "/role",
                template: "<div ui-view></div>"
            })
            .state("app.base.comp.role.list", {
                url: "/list",
                cache: false,
                templateUrl: "View/Role/RoleInfo.html?data=" + Timestamp,
                controller: "RoleListController",
                loadJs: ["Content/script/app/Role/JS_RoleInfo.js"],
                resolve: app.resolve
            })
            .state("app.base.comp.role.detail", {
                url: "/detail",
                cache: false,
                templateUrl: "View/Role/RoleDetail.html?data=" + Timestamp
            })
            .state("app.base.role.view", {
                url: "/view",
                cache: false,
                templateUrl: "View/Role/RoleView.html?data=" + Timestamp
            })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>群组管理配置</summary>
        $stateProvider
           .state("app.base.comp.group", {
               url: "/group",
               template: "<div ui-view></div>"
           })
           .state("app.base.comp.group.list", {
               /// <summary>群组绑定用户</summary>
               url: "/list",
               cache: false,
               templateUrl: "View/Group/GroupList.html?data=" + Timestamp,
               controller: "GroupListController",
               loadJs: ["Content/script/app/Group/JS_GroupInfo.js"],
               resolve: app.resolve
           })
           .state("app.base.comp.group.detail", {
               /// <summary>群组用户详情</summary>
               url: "/detail/:teamCodeId",
               cache: false,
               templateUrl: "View/Group/GroupDatail.html?data=" + Timestamp,
               controller: "GroupDetailController",
               loadJs: ["Content/script/app/Group/JS_GroupDetail.js"],
               resolve: app.resolve
           })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>菜单管理配置</summary>
        $stateProvider
          .state("app.base.comp.menu", {
              url: "/menu",
              template: "<div ui-view></div>"
          })
          .state("app.base.comp.menu.list", {
              /// <summary>群组绑定用户</summary>
              url: "/list",
              cache: false,
              templateUrl: "View/Menu/MenuList.html?data=" + Timestamp,
              controller: "MenuListController",
              loadJs: ["Content/script/app/Menu/JS_MenuInfo.js"],
              resolve: app.resolve
          })
            .state("app.base.comp.menu.view", {
                /// <summary>群组绑定用户</summary>
                url: "/view",
                cache: false,
                templateUrl: "View/Menu/MenuView.html?data=" + Timestamp
            })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>我的地址、我的医生</summary>
        $stateProvider
        .state("app.base.mybusiness.address", {
            /// <summary>我的地址</summary>
            url: "/address",
            cache: false,
            controller: "AddressListController",
            templateUrl: "View/MyBusiness/Address/AddressList.html?data=" + Timestamp,
            loadJs: ["Content/script/app/MyBusiness/Address/JS_AddressList.js"],
            resolve: app.resolve
        })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        $stateProvider
        .state("app.base.mybusiness.doctor", {
            /// <summary>我的医院</summary>
            url: "/doctor",
            cache: false,
            controller: "DoctorListController",
            templateUrl: "View/MyBusiness/Doctor/DoctorList.html?data=" + Timestamp,
            loadJs: ["Content/script/app/MyBusiness/Doctor/JS_DoctorList.js"],
            resolve: app.resolve
        })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>经销商组织管理</summary>
        $stateProvider
           .state("app.base.business.dlorganization", {
               /// <summary>经销商组织列表</summary>
               url: "/dlorganization",
               cache: false,
               templateUrl: "View/Business/DlOrg/DlOrgList.html?data=" + Timestamp,
               controller: "DlOrgListController",
               loadJs: ["Content/script/app/Business/DlOrg/JS_DlOrgList.js"],
               resolve: app.resolve
           })
           .state("app.base.business.dlorganizationEduit", {
               /// <summary>经销商组织编辑</summary>
               url: "/dlorganizationEduit/:dlopt",
               cache: false,
               templateUrl: "View/Business/DlOrg/DlOrgEduit.html?data=" + Timestamp,
               controller: "DlOrgEduitController",
               loadJs: ["Content/script/app/Business/DlOrg/JS_DlOrgEduit.js"],
               resolve: app.resolve
           })
            .state("app.base.business.dlorganizationView", {
                /// <summary>经销商组织详情</summary>
                url: "/dlorganizationView/:dlopt",
                cache: false,
                templateUrl: "View/Business/DlOrg/DlOrgView.html?data=" + Timestamp,
                controller: "DlOrgViewController",
                loadJs: ["Content/script/app/Business/DlOrg/JS_DlOrgView.js"],
                resolve: app.resolve
            })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>货主组织管理</summary>
        $stateProvider
           .state("app.base.business.oiorganization", {
               /// <summary>货主组织列表</summary>
               url: "/oiorganization",
               cache: false,
               templateUrl: "View/Business/OiOrg/OiOrgList.html?data=" + Timestamp,
               controller: "OiOrgListController",
               loadJs: ["Content/script/app/Business/OiOrg/JS_OiOrgList.js"],
               resolve: app.resolve
           })
          .state("app.base.business.oiorganizationEduit", {
              /// <summary>货主组织编辑</summary>
              url: "/oiorganizationEduit/:oiopt",
              cache: false,
              templateUrl: "View/Business/OiOrg/OiOrgEduit.html?data=" + Timestamp,
              controller: "OiOrgEduitController",
              loadJs: ["Content/script/app/Business/OiOrg/JS_OiOrgEduit.js"],
              resolve: app.resolve
          })
           .state("app.base.business.oiorganizationView", {
               /// <summary>货主组织详情</summary>
               url: "/oiorganizationView/:oiopt",
               cache: false,
               templateUrl: "View/Business/OiOrg/OiOrgView.html?data=" + Timestamp,
               controller: "OiOrgViewController",
               loadJs: ["Content/script/app/Business/OiOrg/JS_OiOrgView.js"],
               resolve: app.resolve
           })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>经销商货主关系管理</summary>
        $stateProvider
           .state("app.base.business.relmanagement", {
               /// <summary>经销商货主关系列表</summary>
               url: "/relmanagement",
               cache: false,
               templateUrl: "View/Business/RelMan/RelManList.html?data=" + Timestamp,
               controller: "RelManListController",
               loadJs: ["Content/script/app/Business/RelMan/JS_RelManList.js"],
               resolve: app.resolve
           })
           .state("app.base.business.relmanagement.relmanagementView", {
               /// <summary>经销商货主关系编辑</summary>
               url: "/relmanagementView/:relopt",
               cache: false,
               templateUrl: "View/Business/RelMan/RelManView.html?data=" + Timestamp,
               controller: "RelManViewController",
               loadJs: ["Content/script/app/Business/RelMan/JS_RelManView.js"],
               resolve: app.resolve
           })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>经销商订单事件通知管理</summary>
        $stateProvider
           .state("app.base.business.dlmanagementnotice", {
               /// <summary>经销商订单事件通知列表</summary>
               url: "/dlmanagementnotice",
               cache: false,
               templateUrl: "View/Business/Notice/NoticeList.html?data=" + Timestamp,
               controller: "NoticeListController",
               loadJs: ["Content/script/app/Business/Notice/JS_NoticeList.js"],
               resolve: app.resolve
           })
           .state("app.base.business.dlmanagementnoticeEduit", {
               /// <summary>经销商订单事件通知编辑</summary>
               url: "/dlmanagementnoticeEduit/:dlnoticeopt",
               cache: false,
               templateUrl: "View/Business/Notice/NoticeEduit.html?data=" + Timestamp,
               controller: "NoticeEduitController",
               loadJs: ["Content/script/app/Business/Notice/JS_NoticeEduit.js"],
               resolve: app.resolve
           })
            .state("app.base.business.dlmanagementnoticeView", {
                /// <summary>经销商订单事件通知详情</summary>
                url: "/dlmanagementnoticeView/:dlnoticeopt",
                cache: false,
                templateUrl: "View/Business/Notice/NoticeView.html?data=" + Timestamp,
                controller: "NoticeViewController",
                loadJs: ["Content/script/app/Business/Notice/JS_NoticeView.js"],
                resolve: app.resolve
            })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>医院管理</summary>
        $stateProvider
           .state("app.base.business.hplmanagement", {
               /// <summary>医院列表</summary>
               url: "/hplmanagement",
               cache: false,
               templateUrl: "View/Business/Hospital/HplList.html?data=" + Timestamp,
               controller: "HplListController",
               loadJs: ["Content/script/app/Business/Hospital/JS_HplList.js"],
               resolve: app.resolve
           })
           .state("app.base.business.hplmanagementEduit", {
               /// <summary>医院编辑</summary>
               url: "/hplmanagementEduit/:hplopt",
               cache: false,
               templateUrl: "View/Business/Hospital/HplEduit.html?data=" + Timestamp,
               controller: "HplEduitController",
               loadJs: ["Content/script/app/Business/Hospital/JS_HplEduit.js"],
               resolve: app.resolve
           })
            .state("app.base.business.hplmanagementView", {
                /// <summary>医院详情</summary>
                url: "/hplmanagementView/:hplopt",
                cache: false,
                templateUrl: "View/Business/Hospital/HplView.html?data=" + Timestamp,
                controller: "HplViewController",
                loadJs: ["Content/script/app/Business/Hospital/JS_HplView.js"],
                resolve: app.resolve
            })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>科室管理</summary>
        $stateProvider
           .state("app.base.business.dptmanagement", {
               /// <summary>科室列表</summary>
               url: "/dptmanagement/:dptopt",
               cache: false,
               templateUrl: "View/Business/Department/DptList.html?data=" + Timestamp,
               controller: "DptListController",
               loadJs: ["Content/script/app/Business/Department/JS_DptList.js"],
               resolve: app.resolve
           })
          .state("app.base.business.dptmanagement.dptmanagementEdit", {
              /// <summary>科室编辑</summary>
              url: "/dptmanagementEdit/cc",
              cache: false,
              templateUrl: "View/Business/Department/DptEdit.html?data=" + Timestamp,
              controller: "DptEditController",
              loadJs: ["Content/script/app/Business/Department/JS_DptEdit.js"],
              resolve: app.resolve
          })
           .state("app.base.business.dptmanagementView", {
               /// <summary>科室详情</summary>
               url: "/dptmanagementView/:dptopt",
               cache: false,
               templateUrl: "View/Business/Department/DptView.html?data=" + Timestamp,
               controller: "DptViewController",
               loadJs: ["Content/script/app/Business/Department/JS_DptView.js"],
               resolve: app.resolve
           })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>医生管理</summary>
        $stateProvider
           .state("app.base.business.dtrmanagement", {
               /// <summary>医生列表</summary>
               url: "/dtrmanagement",
               cache: false,
               templateUrl: "View/Business/Doctor/DtrList.html?data=" + Timestamp,
               controller: "DtrListController",
               loadJs: ["Content/script/app/Business/Doctor/JS_DtrList.js"],
               resolve: app.resolve
           })
          .state("app.base.business.dtrmanagementEduit", {
              /// <summary>医生编辑</summary>
              url: "/dtrmanagementEduit/:oiopt",
              cache: false,
              templateUrl: "View/Business/Doctor/DtrEduit.html?data=" + Timestamp,
              controller: "DtrEduitController",
              loadJs: ["Content/script/app/Business/Doctor/JS_DtrEduit.js"],
              resolve: app.resolve
          })
           .state("app.base.business.dtrmanagementView", {
               /// <summary>医生详情</summary>
               url: "/dtrmanagementView/:oiopt",
               cache: false,
               templateUrl: "View/Business/Doctor/DtrView.html?data=" + Timestamp,
               controller: "DtrViewController",
               loadJs: ["Content/script/app/Business/Doctor/JS_DtrView.js"],
               resolve: app.resolve
           })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>厂家管理</summary>
        $stateProvider
           .state("app.base.business.ftymanagement", {
               /// <summary>厂家列表</summary>
               url: "/ftymanagement",
               cache: false,
               templateUrl: "View/Business/Facture/FactureList.html?data=" + Timestamp,
               controller: "FactureListController",
               loadJs: ["Content/script/app/Business/Facture/JS_FactureList.js"],
               resolve: app.resolve
           })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>仓库管理</summary>
        $stateProvider
           .state("app.base.business.whmanagement", {
               /// <summary>仓库列表</summary>
               url: "/whmanagement",
               cache: false,
               templateUrl: "View/Business/WareHouse/WareHouseList.html?data=" + Timestamp,
               controller: "WareHouseListController",
               loadJs: ["Content/script/app/Business/WareHouse/JS_WareHouseList.js"],
               resolve: app.resolve
           })
          .state("app.base.business.whmanagementEduit", {
              /// <summary>仓库编辑</summary>
              url: "/whmanagementEduit/:whopt",
              cache: false,
              templateUrl: "View/Business/WareHouse/WareHouseEduit.html?data=" + Timestamp,
              controller: "WareHouseEduitController",
              loadJs: ["Content/script/app/Business/WareHouse/JS_WareHouseEduit.js"],
              resolve: app.resolve
          })
           .state("app.base.business.whmanagementView", {
               /// <summary>仓库详情</summary>
               url: "/whmanagementView/:whopt",
               cache: false,
               templateUrl: "View/Business/WareHouse/WareHouseView.html?data=" + Timestamp,
               controller: "WareHouseViewController",
               loadJs: ["Content/script/app/Business/WareHouse/JS_WareHouseView.js"],
               resolve: app.resolve
           })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary品牌管理</summary>
        $stateProvider
           .state("app.base.business.brandmanagement", {
               /// <summary>品牌列表</summary>
               url: "/brandmanagement",
               cache: false,
               templateUrl: "View/Business/Brand/BrandList.html?data=" + Timestamp,
               controller: "BrandListController",
               loadJs: ["Content/script/app/Business/Brand/JS_BrandList.js"],
               resolve: app.resolve
           })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>产品线管理</summary>
        $stateProvider
           .state("app.base.business.productlinemanagement", {
               /// <summary>产品线列表</summary>
               url: "/productlinemanagement",
               cache: false,
               templateUrl: "View/Business/ProductLine/ProductLineList.html?data=" + Timestamp,
               controller: "ProductLineController",
               loadJs: ["Content/script/app/Business/ProductLine/JS_ProductLineList.js"],
               resolve: app.resolve
           })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
    /// <summary>我的产品管理</summary>
    $stateProvider
       .state("app.base.business.productmanagement", {
           /// <summary>我的产品列表</summary>
           url: "/productmanagement",
           cache: false,
           templateUrl: "View/Business/AgentProduct/AgentProductList.html?data=" + Timestamp,
           controller: "ProductListController",
           loadJs: ["Content/script/app/Business/AgentProduct/JS_AgentProductList.js"],
           resolve: app.resolve
       })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        /// <summary>仓库订单路由配置</summary>
        $stateProvider
           .state("app.base.business.orderroutingmanagement", {
               /// <summary>仓库订单路由配置列表</summary>
               url: "/orderroutingmanagement",
               cache: false,
               templateUrl: "View/Business/OrderRouting/OrderRoutingList.html?data=" + Timestamp,
               controller: "OrderRoutingListController",
               loadJs: ["Content/script/app/Business/OrderRouting/JS_OrderRoutingList.js"],
               resolve: app.resolve
           })
    })
    .factory("$BaseMenuService", function () {
        /// <summary>OMS菜单服务</summary>
        var service = new Array();

        service.push({
            name: "我的业务数据", url: "", state: "app.mybusiness", icon: "fa-drupal",
            detail: [
                { name: "我的模板", url: "#/app/mybusiness/materialtemplate", state: "app.mybusiness.materialtemplate" },
                { name: "我的套件", url: "#/app/mybusiness/kits", state: "app.mybusiness.kits" },
                { name: "我的物料", url: "#/app/mybusiness/material", state: "app.mybusiness.material" },
                { name: "我的地址", url: "#/app/mybusiness/address", state: "app.mybusiness.address" },
                { name: "我的医生", url: "#/app/mybusiness/doctor", state: "app.mybusiness.doctor" }
            ]
        });
        service.push({
            name: "业务数据管理", url: "", state: "app.business", icon: "fa-link", detail: [
                { name: "经销商管理", url: "#/app/business/dlorganization", state: "app.business.dlorganization" },
                { name: "货主管理", url: "#/app/business/oiorganization", state: "app.business.oiorganization" },
                { name: "医院管理", url: "#/app/business/hplmanagement", state: "app.business.hplmanagement" },
                //{ name: "科室管理", url: "#/app/business/dptmanagement", state: "app.business.dptmanagement" },
                { name: "医生管理", url: "#/app/business/dtrmanagement", state: "app.business.dtrmanagement" },
                { name: "厂商管理", url: "#/app/business/ftymanagement", state: "app.business.ftymanagement" },
                { name: "仓库管理", url: "#/app/business/whmanagement", state: "app.business.whmanagement" },
                { name: "品牌管理", url: "#/app/business/brandmanagement", state: "app.business.brandmanagement" },
                { name: "产品线管理", url: "#/app/business/productlinemanagement", state: "app.business.productlinemanagement" },
                { name: "订单仓库路由管理", url: "#/app/business/orderroutingmanagement", state: "app.business.orderroutingmanagement" },
                { name: "代理产品管理", url: "#/app/business/productmanagement", state: "app.business.productmanagement" },
                { name: "事件通知管理", url: "#/app/business/dlmanagementnotice", state: "app.business.dlmanagementnotice" },
            ]
        });
        service.push({
            name: "权限管理", url: "", state: "app.comp", icon: "fa-folder-open",
            detail: [
                { name: "用户列表", url: "#/app/comp/user/list", state: "app.comp.user.list" },
                { name: "角色列表", url: "#/app/comp/role/list", state: "app.comp.role.list" },
                { name: "菜单列表", url: "#/app/comp/menu/list", state: "app.comp.menu.list" },
                { name: "群组列表", url: "#/app/comp/group/list", state: "app.comp.group.list" }
            ]
        });
        service.push({
            name: "基础信息", url: "", state: "app.basis", icon: "fa-desktop", detail: [
                { name: "国家信息", url: "#/app/base/country", state: "app.basis.country" },
                { name: "行政区域", url: "#/app/base/admd", state: "app.basis.admd" },
                { name: "币种信息", url: "#/app/base/currency", state: "app.basis.currency" },
                { name: "数据字典", url: "#/app/base/dictionary", state: "app.basis.dictionary" },
                { name: "事件编码", url: "#/app/base/event", state: "app.basis.event" },
                { name: "语言管理", url: "#/app/base/lang", state: "app.basis.lang" },
                { name: "登录日志", url: "#/app/base/journal", state: "app.basis.journal" },
            ]
        });
        return service;
    })

