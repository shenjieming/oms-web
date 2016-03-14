/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("MyOrderListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>我的订单控制器</summary>
    $scope.title = "我的订单";
    $scope.Competence = {
    };
    //条件清空
    $.extend($scope.Pagein, {
        pageIndex: 1, sONo: "", createDateBegin: "",
        createDateEnd: "",
    });
    $scope.Integrated.GetOrderList({ opt: "OPER_MYORDER_LIST" });
});