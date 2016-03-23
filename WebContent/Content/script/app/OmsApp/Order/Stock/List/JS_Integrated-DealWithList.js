/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("StockDealWithListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>订单处理控制器</summary>
    $scope.title = "备货订单待处理列表";

    $scope.Competence = {
        dealwith: true
    };
    //数据清空
    $.extend($scope.Pagein, { pageIndex: 1, sONo: "" });
    $scope.Integrated.GetStockList({ opt: "INSTK_PROCESS_LIST" });
    $scope.showView = function (sono) {
        /// <summary>查看备货订单</summary>
        $local.setValue("ORDERCOMP", {});
        $state.go("app.stock.view", { sono: sono });
    }

});