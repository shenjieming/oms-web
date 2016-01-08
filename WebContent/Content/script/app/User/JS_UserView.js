/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("UserViewController", function ($scope, $state, $local, $Api, $MessagService, $stateParams) {
    /// <summary>用户视图</summary>
    $scope.UserDetail = {
        UserInfo:[],
        Load: function (callback) {
            $scope.obj = $stateParams.obj;
            $scope.UserDetail.getUserDetail();
        },
        getUserDetail: function () {
            /// <summary>获取用户列表详情</summary>
            $MessagService.loading("用户信息加载中，请稍等...");
            $Api.UserService.GetUserInfo({ loginAccountId: $scope.obj }, function (rData) {
                $scope.UserDetail.UserInfo = rData;
                console.log(rData)
            })
        },
    }
    $scope.UserDetail.Load();
})