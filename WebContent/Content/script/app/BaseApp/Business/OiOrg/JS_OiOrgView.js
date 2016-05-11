/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("OiOrgViewController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>货主详情</summary>
    $scope.OiOrgView = {
        Info: [],
        GetOiOrgDetail: function () {
            /// <summary>获取货主详情</summary>
            $scope.oiopt = $stateParams.oiopt;
            $Api.ManageOi.GetqueryOwnerOfInventoryDetail({ orgCode: $scope.oiopt }, function (rData) {
                $scope.OiOrgView.Info = rData;
                $scope.OiOrgView.BackpackcorpRegCapital = $scope.OiOrgView.Info.corpRegCapital / 10000;
            })
        },
    }
    $scope.OiOrgView.GetOiOrgDetail()
})