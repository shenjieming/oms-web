/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("WareHouseViewController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>仓库详情</summary>
    $scope.whPageInfo = {
        Info: [],
        GetWareHouseDetail: function () {
            /// <summary>获取仓库详情</summary>
            $scope.whopt = $stateParams.whopt;
            $Api.ManaWareHouse.GetqueryWareHouseDetail({ orgCode: $scope.whopt }, function (rData) {
                $scope.whPageInfo.Info = rData;
                console.log(rData)
            })
        },
    }
    $scope.whPageInfo.GetWareHouseDetail()
})