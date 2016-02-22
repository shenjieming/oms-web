/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("SignListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>签收订单管理控制器</summary>
    $scope.title = "待签收订单列表";

    $scope.Competence = {
        sign: true
    };
    //条件清空
    $.extend($scope.Pagein, { pageIndex: 1, sONo: "" });
    $scope.Integrated.GetOrderList({ opt: "OPER_SIGN_LIST" });

    $scope.showView = function (sono) {
        /// <summary>查看手术订单</summary>
        $local.setValue("ORDERCOMP", { sign: true });
        $state.go("app.order.view", { sono: sono });
    }
});