/// <reference path="../../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../../service/system/localService.js" />
/// <reference path="../../Config.js" />

app.controller("BackListController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>返库处理控制器</summary>
    $scope.title = "待返库处理列表";
    $scope.Competence = {
        back: true
    };
    $scope.Integrated.GetOrderList({ opt: "OPER_PROCESSBACK_LIST" });
});