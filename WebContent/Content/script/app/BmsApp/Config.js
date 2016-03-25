/// <reference path="../../lib/angular-1.2.20/angular.min.js" />

var BmsApp = angular.module('BmsApp', ["BMSApiService"]);
BmsApp
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        $stateProvider
             .state("app.bms", { /// <summary>票据管理模板</summary>
                 url: "/bms",
                 cache: false,
                 template: "<div ui-view></div>",
                 abstract: true
             })
    })
    .config(function ($stateProvider, $urlRouterProvider, $requireProvider) {
        $stateProvider
            .state("app.bms.bill", {  /// <summary>计费管理信息</summary>
                url: "/bill",
                cache: false,
                template: "<div ui-view></div>",
                abstract: true
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