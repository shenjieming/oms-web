/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("HplEduitController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>医院新增</summary>
    $scope.HplPageInfo = {
        Info: {validStatus:true},
        Load: function (callback) {
            if ($stateParams.hplopt) {
                $scope.hplopt = $stateParams.hplopt;
                $scope.HplPageInfo.GetDlOrgDetail();
            }
        },
        checkIs: function () {
            $scope.HplPageInfo.Info.validStatus = !$scope.HplPageInfo.Info.validStatus
        },
        GetDlOrgDetail: function () {
            /// <summary>获取医院详情</summary>
            $Api.ManaHospital.GetqueryAllHospital({ hPCode: $scope.hplopt }, function (rData) {
                $scope.HplPageInfo.Info = rData;
                console.log(rData)
            })
        },
        Save: function () {
            /// <summary>医院组操作</summary>
            console.log($scope.HplPageInfo.Info)
            $Api.ManaHospital.Save($scope.HplPageInfo.Info, function (rData) {
                $MessagService.succ("医院保存成功！");
                self.location = 'index.html#/app/business/hplmanagement';
            })
        },
    }
    $scope.HplPageInfo.Load();
})