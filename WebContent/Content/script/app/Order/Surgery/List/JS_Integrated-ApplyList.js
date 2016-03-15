/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("ApplyListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>订单返库申请控制器</summary>
    $scope.title = "待返库申请列表";

    $scope.Competence = {
        apply: true
    }
    $scope.Integrated.ClearWhere(true);
    $scope.Integrated.GetOrderList({ opt: "OPER_WAITBACK_LIST" });
});