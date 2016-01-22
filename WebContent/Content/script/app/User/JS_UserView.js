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
    $scope.Information = [];
    $scope.UserDetail = {
        UserInfo:[],
        Load: function (callback) {
            $scope.accId = $stateParams.accId;
            console.log($scope.accId)
            $scope.UserDetail.getUserDetail();
            //$scope.UserDetail.GetRoleInfo()
            $scope.UserDetail.getUserInformation();
        },
        getUserDetail: function () {
            /// <summary>获取用户列表详情</summary>
            $MessagService.loading("用户信息加载中，请稍等...");
            $Api.UserService.GetUserInfo({ loginAccountId: $scope.accId }, function (rData) {
                $scope.UserDetail.UserInfo = rData;
                console.log(rData)
            })
        },
        getUserInformation: function () {
            /// <summary>获取用户当前登录信息</summary>
            $Api.AccountService.CurrentUserInfo({ loginAccountId: $scope.accId }, function (rData) {
                if (!rData.code) {
                    $scope.UserDetail.UserInfo.roleName = rData.roleInfo[0].roleName;
                    console.log(rData)
                }
            })
        },
        GetRoleInfo: function () {
            /// <summary>获取角色列表详情</summary>
            $MessagService.loading("用户信息加载中，请稍等...");
            $Api.RoleService.GetRoleDetail({ roleId: $scope.UserDetail.UserInfo.roles[0].roleId }, function (rData) {
                if (!rData.code) {
                    $scope.UserDetail.UserInfo.roleName = rData.roleName;
                    //console.log(rData)
                }
            })
        }
    }
    $scope.UserDetail.Load();
})