/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("StockApprovalListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>备货订单审批控制器</summary>
    $scope.title = "待审批订单";

    //数据清空
    $.extend($scope.Pagein, { pageIndex: 1, sONo: "" });
    $scope.Integrated.GetStockList({ opt: "INSTK_ADUIT_LIST" });

    $scope.Competence = {
        approval: true
    };


    $scope.showView = function (sono) {
        /// <summary>查看备货订单</summary>
        $local.setValue("ORDERCOMP", { approval: true });
        $state.go("app.oms.stock.view", { sono: sono });
    }
});