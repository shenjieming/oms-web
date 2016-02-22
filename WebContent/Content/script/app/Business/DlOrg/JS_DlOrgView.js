/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("DlOrgViewController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>经销商详情</summary>
    $scope.DlOrgView = {
        Info:[],
        GetDlOrgDetail: function () {
            $scope.dlopt = $stateParams.dlopt;
            /// <summary>获取经销商详情</summary>
            $Api.ManageDl.GetqueryDealerDetail({ orgCode: $scope.dlopt }, function (rData) {
                $scope.DlOrgView.Info = rData;
                console.log(rData)
            })
        },
    }
    $scope.DlOrgView.GetDlOrgDetail()
})