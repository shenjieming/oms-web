/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("StockMyDraftListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>订单草稿数据控制器</summary>
    $scope.title = "我的订单草稿";

    $scope.Competence = {
        modify: true,
        submit:true
    };
    $scope.showView = function (sono) {
        /// <summary>查看备货订单</summary>
        $state.go("app.stock.single", { sono: sono });
    }
    $scope.Integrated.GetStockList({ opt: "INSTK_MYORDER_DRAFT" });
});