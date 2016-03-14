/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("MyDraftListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>订单草稿数据控制器</summary>
    $scope.title = "我的订单草稿";

    $scope.Competence = {
        modify: true,
        submit:true
    };
    $scope.showView = function (sono) {
        /// <summary>查看手术订单</summary>
        $state.go("app.order.single", { sono: sono });
    }
    //条件清空
    $.extend($scope.Pagein, {
        pageIndex: 1, sONo: "", createDateBegin: "",
        createDateEnd: "",
    });
    $scope.Integrated.GetOrderList({ opt: "OPER_MYORDER_DRAFT" });
});