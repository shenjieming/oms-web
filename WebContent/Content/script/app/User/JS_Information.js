/// <reference path="../../lib/angular-1.2.20/angular-route.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-touch.js" />
/// <reference path="../../lib/angular-1.2.20/angular-sanitize.min.js" />
/// <reference path="../../lib/angular-1.2.20/angular-loader.js" />
/// <reference path="../../lib/Jquery/jquery-1.11.1.min.js" />
/// <reference path="../service/system/localService.js" />
/// <reference path="../Config.js" />

app.controller("InformationController", function ($scope, $state, $local, $Api, $MessagService) {
    /// <summary>我的信息管理</summary>
    Information: [];
    $scope.PageInfo = {
        UserInfo:[],
        Load: function (callbake) {            
            $scope.PageInfo.getUserInformation();
        },
        getUserInformation: function () {
            /// <summary>获取用户当前登录信息</summary>
            $Api.AccountService.CurrentUserInfo({}, function (rData) {
                if (!rData.code) {
                    $scope.PageInfo = rData.userInfo;
                    $scope.userInformationDetail();
                    console.log(rData)                 
                }
            })
        },
    }
    $scope.userInformationDetail= function () {
        /// <summary>获取用户信息信息</summary>
        $MessagService.loading("用户信息加载中，请稍等...");
        console.log($scope.PageInfo)
        $Api.UserService.GetUserInfo({ loginAccountId: $scope.PageInfo.loginAccountId }, function (rData) {
            if (!rData.code) {
                $scope.PageInfo.UserInfo = rData;
                console.log(rData)
            }
        })
    },
    $scope.Jumpcenter = {
        operationOrder: function () {
            $state.go("app.order.single");
        },
        ReadyOrder:function(){
            $state.go("app.stock.single");
        },
        UesrDetail: function () {
            var accId = [];
            $state.go("app.comp.user.view", { accId: $scope.PageInfo.loginAccountId });
        },
    }
    $scope.PageInfo.Load();
})