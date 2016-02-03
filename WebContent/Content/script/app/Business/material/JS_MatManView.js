/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />
/// <reference path="JS_MaterialList.js" />

app.controller("MatManViewController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>物料详情页面</summary>
    $scope.MatManInfo = {
        Load: function (callback) {
            $scope.opt = $stateParams.opt;
            $scope.getMatManList();
        },
    }
    $scope.getMatManList = function () {
        $Api.MaterialsService.GetMaterialsList({ categoryByPlatform: $scope.opt }, function (rData) {
            console.log(rData)
        });
    }
    $scope.MatManInfo.Load();
});