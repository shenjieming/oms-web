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
    $scope.Information = [];//用户信息
    $scope.ComAddress = [];//常用地址
    $scope.ContacDoctor = [];//联系医生
    $scope.PersonalRight = [];//个人功能权限
    $scope.PageInfo = {
        UserInfo: [],
        RoleNameList:[],
        getUserInformation: function () {
            /// <summary>获取用户当前登录信息</summary>
            $Api.AccountService.CurrentUserInfo({}, function (rData) {
                console.log(rData)
                if (!rData.code) {
                    $scope.Information = rData;
                    $scope.MenuInfo = rData.functionInfo;
                    $scope.userInformationDetail();
                    for (var i = 0; i < rData.roleInfo.length; i++) {
                        $scope.PageInfo.RoleNameList.push(rData.roleInfo[i].roleName)
                    }
                    $scope.Information.roleName = $scope.PageInfo.RoleNameList;
                }
            })
        },
    }
    $scope.userInformationDetail= function () {
        /// <summary>获取用户信息信息</summary>
        $MessagService.loading("用户信息加载中，请稍等...");
        $Api.UserService.GetUserInfo({ loginAccountId: $scope.Information.userInfo.loginAccountId }, function (rData) {
            if (!rData.code) {
                $scope.PageInfo.UserInfo = rData;
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
            $state.go("app.comp.user.view", { accId: $scope.Information.userInfo.loginAccountId });
        },
    }
    $scope.Pagein = {
        pageSize: 5,
        pageIndex: 1,
        callbake: function () {
            $scope.Load();
        }
    };
    $scope.Load = function () {
        /// <summary>页面初始化</summary>
        $scope.PageInfo.getUserInformation();
    }
    $scope.Load();
})