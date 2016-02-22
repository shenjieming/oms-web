/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("DlOrgEduitController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>经销商新增</summary>
    $scope.dlPageInfo = {
        Info: {},
        Load: function (callback) {
            if ($stateParams.dlopt) {
                $scope.dlopt = $stateParams.dlopt;
                $scope.dlPageInfo.GetDlOrgDetail();
                console.log($scope.dlopt)
            }
        },
        GetDlOrgDetail: function () {
            /// <summary>获取经销商详情</summary>
            $Api.ManageDl.GetqueryDealerDetail({ orgCode: $scope.opt }, function (rData) {
                $scope.dlPageInfo.Info = rData;
                console.log(rData)
            })
        },
        Save: function () {
            /// <summary>经销商组操作</summary>
            console.log($scope.dlPageInfo.Info)
            $Api.ManageDl.Save($scope.dlPageInfo.Info, function (rData) {
                $MessagService.succ("用户保存成功！");
                self.location = 'index.html#/app/business/dlorganization';
            })
        },
    }
    $scope.dlPageInfo.Load();
})