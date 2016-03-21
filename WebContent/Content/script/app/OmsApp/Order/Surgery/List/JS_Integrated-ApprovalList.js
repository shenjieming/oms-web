/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("ApprovalListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>手术订单审批控制器</summary>
    $scope.title = "待审批订单列表";

    $scope.Integrated.GetOrderList({ opt: "OPER_ADUIT_LIST" });

    $scope.Competence = {
        approval: true
    };


    //条件清空
    $scope.Integrated.ClearWhere(true);
    $scope.showView = function (sono) {
        /// <summary>查看手术订单</summary>
        $local.setValue("ORDERCOMP", { approval: true });
        $state.go("app.order.view", { sono: sono });
    }
});